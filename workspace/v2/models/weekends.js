var  mongoose       = require("mongoose");

//Dates Schema
var weekendSchema = new mongoose.Schema({
    begin: Date,
    end: Date,
    weekOfMonth: Number
});

module.exports = mongoose.model("Weekend", weekendSchema);