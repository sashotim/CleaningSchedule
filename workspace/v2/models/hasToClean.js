var mongoose = require("mongoose");

//User Schema
var hasToCleanSchema = new mongoose.Schema({
    task: String,
    isDone: Boolean,
    weekend: {
        begin: Date,
        end: Date,
        weekOfMonth: Number
    },
    doneBy: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        name: String
    }
});

module.exports = mongoose.model("HasToClean", hasToCleanSchema);
