var mongoose = require('mongoose');

//create schema
    var campgroundSchema = new mongoose.Schema({
        name        : String,
        image       : String,
        desc        : String,
        author      : {
            id      : {
                type    : mongoose.Schema.Types.ObjectId,
                ref     : "User"
            },
            username: String
        },
        comments    : [
            {
                type    : mongoose.Schema.Types.ObjectId,
                ref     : "Comment"
            }
        ]
    });

    //compilte schema to model
  module.exports = mongoose.model("Campground",campgroundSchema);