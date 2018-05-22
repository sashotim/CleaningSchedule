var express = require("express");
var router  = express.Router();
var User = require("../models/user");
var middleware = require("../middleware");
var request = require("request");
var moment = require("moment");

router.get("/", function(req, res){
    var users = [
        {name: "Aleks", hasToClean: "Kitchen"},
        {name: "Kevin", hasToClean: "WC"},
        {name: "Luba", hasToClean: "Floor"},
        {name: "Liz", hasToClean: "Shower"}
        ],
        dates = [1, 2, 3, 4],
        today = moment().format(" Do MMM (dddd)");
    
    res.render("cleaning", {users:users, dates:dates, today:today}); 
});

module.exports = router;