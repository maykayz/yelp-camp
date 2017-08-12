var mongoose = require('mongoose');


var commentSchema = new mongoose.Schema({
    text    : String,
    user    : String,
    time    : Date
});

module.exports = mongoose.model("Comment",commentSchema);