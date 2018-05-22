//***********************************************************
//BETTER ONE
//***********************************************************



Weekend.find({}, function(err, dates) {
    if (err) {
        console.log(err);
    }
    else {
        dates.forEach(function(date) {
            switch (date.weekOfMonth) { //ON WHICH WEEK  
                //0,Aleks,Shower 1,Aleks,WC 2,Aleks,Kitchen 3,Aleks,Hallway 
                //0,Liz,Hallway 1,Liz,Shower 2,Liz,WC 3,Liz,Kitchen
                //0,Liuba,Kitchen 1,Liuba,Hallway 2,Liuba,Shower 3,Liuba,WC
                //0,Kevin,WC 1,Kevin,Kitchen 2,Kevin,Hallway 3,Kevin,Shower
                case 0:
                    User.findOne({ name: "Liuba" }, function(err, user) { //WHO CLEANS
                        if (err) {
                            console.log(err);
                        }
                        else {
                            HasToClean.create({
                                task: "Kitchen", //WHAT HE CLEANS
                                isDone: "false",
                                weekend: date
                            }, function(err, hasToClean) {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    //add name and id to comment
                                    hasToClean.doneBy.id = user._id;
                                    hasToClean.doneBy.name = user.name;
                                    //save comment
                                    hasToClean.save();
                                    // user.hasToClean = [];
                                    user.hasToClean.push(hasToClean);
                                    user.save();
                                    console.log(hasToClean);
                                }
                            });
                            console.log(user);
                        }
                    });
                    break;
                    //0,Aleks,Shower 1,Aleks,WC 2,Aleks,Kitchen 3,Aleks,Hallway 
                    //0,Liz,Hallway 1,Liz,Shower 2,Liz,WC 3,Liz,Kitchen
                    //0,Liuba,Kitchen 1,Liuba,Hallway 2,Liuba,Shower 3,Liuba,WC
                    //0,Kevin,WC 1,Kevin,Kitchen 2,Kevin,Hallway 3,Kevin,Shower
                case 1:
                    User.findOne({ name: "Liuba" }, function(err, user) { //WHO CLEANS
                        if (err) {
                            console.log(err);
                        }
                        else {
                            HasToClean.create({
                                task: "Hallway", //WHAT HE CLEANS
                                isDone: "false",
                                weekend: date
                            }, function(err, hasToClean) {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    //add name and id to comment
                                    hasToClean.doneBy.id = user._id;
                                    hasToClean.doneBy.name = user.name;
                                    //save comment
                                    hasToClean.save();
                                    // user.hasToClean = [];
                                    user.hasToClean.push(hasToClean);
                                    user.save();
                                    console.log(hasToClean);
                                }
                            });
                            console.log(user);
                        }
                    });
                    break;
                    //0,Aleks,Shower 1,Aleks,WC 2,Aleks,Kitchen 3,Aleks,Hallway 
                    //0,Liz,Hallway 1,Liz,Shower 2,Liz,WC 3,Liz,Kitchen
                    //0,Liuba,Kitchen 1,Liuba,Hallway 2,Liuba,Shower 3,Liuba,WC
                    //0,Kevin,WC 1,Kevin,Kitchen 2,Kevin,Hallway 3,Kevin,Shower
                case 2:
                    User.findOne({ name: "Liuba" }, function(err, user) { //WHO CLEANS
                        if (err) {
                            console.log(err);
                        }
                        else {
                            HasToClean.create({
                                task: "Shower", //WHAT HE CLEANS
                                isDone: "false",
                                weekend: date
                            }, function(err, hasToClean) {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    //add name and id to comment
                                    hasToClean.doneBy.id = user._id;
                                    hasToClean.doneBy.name = user.name;
                                    //save comment
                                    hasToClean.save();
                                    // user.hasToClean = [];
                                    user.hasToClean.push(hasToClean);
                                    user.save();
                                    console.log(hasToClean);
                                }
                            });
                            console.log(user);
                        }
                    });
                    break;
                    //0,Aleks,Shower 1,Aleks,WC 2,Aleks,Kitchen 3,Aleks,Hallway 
                    //0,Liz,Hallway 1,Liz,Shower 2,Liz,WC 3,Liz,Kitchen
                    //0,Liuba,Kitchen 1,Liuba,Hallway 2,Liuba,Shower 3,Liuba,WC
                    //0,Kevin,WC 1,Kevin,Kitchen 2,Kevin,Hallway 3,Kevin,Shower
                case 3:
                    User.findOne({ name: "Liuba" }, function(err, user) { //WHO CLEANS
                        if (err) {
                            console.log(err);
                        }
                        else {
                            HasToClean.create({
                                task: "WC", //WHAT HE CLEANS
                                isDone: "false",
                                weekend: date
                            }, function(err, hasToClean) {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    //add name and id to comment
                                    hasToClean.doneBy.id = user._id;
                                    hasToClean.doneBy.name = user.name;
                                    //save comment
                                    hasToClean.save();
                                    // user.hasToClean = [];
                                    user.hasToClean.push(hasToClean);
                                    user.save();
                                    console.log(hasToClean);
                                }
                            });
                            console.log(user);
                        }
                    });
                    break;
            }
        });
    }
});
