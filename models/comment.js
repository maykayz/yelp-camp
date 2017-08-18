var mongoose = require('mongoose');


var commentSchema = new mongoose.Schema({
    text    : String,
    time    : Date,
    author  : {
        id          :   {
                type    : mongoose.Schema.Types.ObjectId,
                ref     : "User"
        },
        username        : String,
        profilepic  : String
    }
});

module.exports = mongoose.model("Comment",commentSchema);