var middlewareObj = {};
var Campground      = require("../models/campground");
var Comment         = require("../models/comment");

middlewareObj.isLoggedIn    = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
        req.flash("error","You must log in.");
        res.redirect("back");
}

middlewareObj.checkCampgroundOwnership  = function(req,res,next){
    if(req.isAuthenticated()){
        var user = req.user;
        var campgroundId = req.params.id;
        Campground.findById(campgroundId,function(err,foundCamp){
            if(err){
                console.log(err);
            }else{
                if(foundCamp.author.id.equals(user._id)){
                    return next();
                }
                else{
                    req.flash("error","Access to Campground Denied.");
                    res.redirect("back");
                }
            }
        });
    }
}
middlewareObj.checkCommentOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        var cid = req.params.cid;
        Comment.findById(cid,function(err,foundComment){
            if(err){
                console.log(err);
            }else{
                if(foundComment.author.id.equals(req.user._id)){
                    return next();
                }
                else{
                    req.flash("error","Access to Comment Denied.");
                    res.render("/login");
                }
            }
        });
    }
}

module.exports  = middlewareObj;

