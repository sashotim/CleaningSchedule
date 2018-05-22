var mongoose = require("mongoose");

var eventSchema = new mongoose.Schema({
    title: String,
    body: String,
    image: String,
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Event", eventSchema);
