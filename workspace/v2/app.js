var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    expressSanitizer = require("express-sanitizer"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/users"),
    HasToClean = require("./models/hasToClean"),
    Weekend = require("./models/weekends"),
    Event = require("./models/events"),
    moment = require("moment"),
    methodOverride = require('method-override');


mongoose.connect("mongodb://localhost/cleaning_schedule1");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride('_method'));


//**********************
//Passport configuration
//**********************

app.use(require("express-session")({
    secret: "This is a secret massege that only I know",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

//*********************************
//INDEX ROUTES
//*********************************

app.get("/", function(req, res) {
    res.render("landing");
});

//*********************************
//CLEANING ROUTES
//*********************************

app.get("/cleaning", isLoggedIn, function(req, res) {
    User.find({}).populate("hasToClean").exec(function(err, users) {
        if (err) {
            console.log(err);
        }
        else {
            Weekend.find({}, function(err, dates) {
                if (err) {
                    console.log(err);
                }
                else {
                    var today = moment().format(" Do MMM (dddd)");
                    var endOfThisWeek = moment().add(1, 'weeks').startOf('isoWeek');
                    HasToClean.find({}, function(err, hasToCleans) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            res.render("cleaning", { users: users, dates: dates, today: today, hasToCleans: hasToCleans, endOfThisWeek: endOfThisWeek });
                        }
                    });
                }
            }).sort({ begin: 1 });
        }
    });
});

app.put("/cleaning/:id", function(req, res) {
    HasToClean.findByIdAndUpdate(req.params.id, { "isDone": true }, function(err, hasToClean) {
        if (err) {
            console.log(err);
        }
        else {
            var showUrl = "/cleaning";
            res.redirect(showUrl);
        }
    });
});


//***************************
//EVENTS ROUTES
//***************************
app.get("/events", function(req, res) {
    Event.find({}, function(err, events) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("indexEvent", { events: events });
        }
    });
});

app.get("/events/new", function(req, res) {
    res.render("newEvent");
});

app.post("/events", function(req, res) {
    req.body.event.body = req.sanitize(req.body.event.body);
    var formData = req.body.event;
    Event.create(formData, function(err, newEvent) {
        console.log(newEvent);
        if (err) {
            res.render("newEvent");
        }
        else {
            res.redirect("/events");
        }
    });
});

app.get("/events/:id", function(req, res) {
    Event.findById(req.params.id, function(err, event) {
        if (err) {
            res.redirect("/events");
        }
        else {
            res.render("showEvent", { event: event });
        }
    });
});

app.get("/events/:id/edit", function(req, res) {
    Event.findById(req.params.id, function(err, event) {
        if (err) {
            console.log(err);
            res.redirect("/events")
        }
        else {
            res.render("editEvent", { event: event });
        }
    });
});

app.put("/events/:id", function(req, res) {
    Event.findByIdAndUpdate(req.params.id, req.body.event, function(err, event) {
        if (err) {
            console.log(err);
        }
        else {
            var showUrl = "/events/" + event._id;
            res.redirect(showUrl);
        }
    });
});

app.delete("/events/:id", function(req, res) {
    Event.findById(req.params.id, function(err, event) {
        if (err) {
            console.log(err);
        }
        else {
            event.remove();
            res.redirect("/events");
        }
    });
});

//*******************************
//AUTH ROUTES
//*******************************

app.get("/register", function(req, res) {
    res.render("register");
});

app.post("/register", function(req, res) {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function() {
            res.redirect("/");
        });
    });
});

app.get("/login", function(req, res) {
    res.render("login");
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
}), function(req, res) {});

app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

Weekend.find({}, function(err, dates) {
    if (err) {
        console.log(err);
    }
    else {
        Weekend.remove({}, function(err) {
            if (err) {
                console.log(err);
            }
            else {
                for (var i = 0; i < 10; i++) {
                    var begin = moment().subtract(5, 'week').endOf('isoWeek').subtract(2, 'day').add(i, 'week');
                    var end = moment().subtract(4, 'week').startOf('isoWeek').add(i, 'week');
                    Weekend.create({
                            begin: begin,
                            end: end,
                            weekOfMonth: ((3 + i) % 4)
                        },
                        function(err, weekend) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                console.log("NEWLY CREATED WEEKEND: ");
                                console.log(weekend);
                            }
                        });
                    console.log(i);
                }
            }
        });
    }
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Cleaning Schedule Server has started!");
});
