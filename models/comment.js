var mongoose = require('mongoose');


var commentSchema = new mongoose.Schema({
    text    : String,
    user    : String,
    time    : Date,
    pic     : String
});

module.exports = mongoose.model("Comment",commentSchema);