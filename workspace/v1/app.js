var express = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    passport       = require("passport"),
    //cookieParser   = require("cookie-parser"),
    LocalStrategy  = require("passport-local"),
    flash          = require("connect-flash"),
    User           = require("./models/user"),
    session        = require("express-session"),
    seedDB         = require("./seeds"),
    methodOverride = require("method-override"),
    moment         = require("moment");
    
var cleaningRoutes    = require("./routes/cleaning"),
eventsRoutes = require("./routes/events"),
indexRoutes      = require("./routes/index");

mongoose.connect("mongodb://localhost/cleaning_schedule");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));
//app.use(cookieParser('secret'));

app.use(require("express-session")({
    secret: "This is very secret!",
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/", indexRoutes);
app.use("/cleaning", cleaningRoutes);
app.use("/events", eventsRoutes);

User.create({name: "Aleks", isDoneForTheWeek: "false"}, function(err, user){
    if(err){
        console.log(err);
    }else{
        console.log(user);
    }
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Cleaning Schedule Server has started!");
});
