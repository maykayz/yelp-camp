var mongoose        = require('mongoose');
var passportLocalMongoose= require('passport-local-mongoose');

userSchema = new mongoose.Schema({
    username    : String,
    password    : String,
    profilepic  : String,
    email       : String
});

userSchema.plugin(passportLocalMongoose);
module.exports   = mongoose.model("User",userSchema);