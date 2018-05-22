var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

//User Schema
var userSchema = new mongoose.Schema({
   username: String,
   password: String,
   name: String,
   hasToClean: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "HasToClean"
   }]
});

userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", userSchema);
