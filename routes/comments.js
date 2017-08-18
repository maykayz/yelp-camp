var express     = require("express"),
    router      = express.Router({mergeParams:true}),
    Campground  = require("../models/campground"),
    Comment     = require("../models/comment"),
    moment      = require("moment");
var middleware  = require("../middleware");

//=================================//  

// Add new comment
router.post("/",middleware.isLoggedIn,function(req,res){
    var ctext = req.body.commenttext;
    var cauthor  = {
        id          : req.user._id,
        username    : req.user.username,
        profilepic  : req.user.profilepic
    };
 Campground.findById(req.params.id).populate("comments").exec(function(err,campground){
        if(err){
            console.log(err);
        }else{
            Comment.create({
                text    : ctext,
                time    : moment(),
                author     : cauthor   
            },function(err,createdComment){
                if(err){
                    console.log(err);
                }else{
                    campground.comments.push(createdComment);
                    campground.save(function(err,savedCamp){
                        if(err){
                            console.log(err);
                        }else{
                            res.redirect("/campgrounds/"+campground._id);
                        }
                    });
                }
            })
        }
    });

});
//delete comment
router.delete("/:cid",middleware.checkCommentOwnership,function(req,res){
    var cid = req.params.cid;
    var campID = req.params.id;
            Comment.findByIdAndRemove(cid,function(err,comment){
                if(err){
                    console.log(err);
                    req.flash("error","Cannot delete comment.");
                    res.redirect("/campgrounds/"+campID);
                }else{
                    req.flash("success","Comment deleted.");
                    res.redirect("/campgrounds/"+campID);
                }
            });
});
//=================================//  
//=================================//  
// Module export
module.exports  = router;