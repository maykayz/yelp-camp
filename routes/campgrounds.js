var express     = require("express"),
    router      = express.Router(),
    Campground  = require("../models/campground");
var middleware  = require("../middleware");

// ---------CAMPGROUND ROUTES--------- //
//Campgrounds 
router.get("/",function(req,res){
    //retrieve campgrounds from database
    Campground.find({},function(err,foundcampgrounds){
        if(err){
            console.log(err);
            req.flash("error","No campgrounds");
            res.redirect("campground/campgrounds");
        }else{
            res.render("campground/campgrounds",{campgrounds:foundcampgrounds,currentUser:req.user});
        }
    });

});
//Campground Create
router.post("/",middleware.isLoggedIn,function(req,res){
    var campName = req.body.campName;
    var campLink = req.body.campLink;
    var campDesc = req.body.campDesc;
    var author   = {
        id          : req.user._id,
        username    : req.user.username
    };
    console.log(author.username);
    if(campName && campLink && campDesc){
           Campground.create({
            name    :campName,
            image   :campLink,
            desc    :campDesc,
            author  :author
        },function(err,camp){
            if(err){
                console.log(err);
            }else{
                req.flash("success","New campground created.");
                res.redirect("/campgrounds");
            }
        });
    }else{
        req.flash("error","Cannot add campground.");
        res.redirect("/campgrounds/new");
    }
        
});
//Campground New
router.get("/new",middleware.isLoggedIn,function(req,res){
    res.render("campground/createNew",{currentUser:req.user});
});

//Particular Campground Page
router.get("/:id",middleware.isLoggedIn,function(req,res){
    var id = req.params.id;
    Campground.findById(id).populate("comments").exec(function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            res.render("campground/show",{campground:campground,moment:moment,currentUser:req.user});
            
        }
    });
});
//Campground Delete
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
    //find campground and delete from db
    Campground.findByIdAndRemove(req.params.id,function(err,deletedCamp){
        if(err){
            console.log(err);
            //redirect
            req.flash("error","Cannot delete campground.");
            res.redirect("/campgrounds");
        }else{
            //redirect
            req.flash("success","Campground deleted!.");
            res.redirect("/campgrounds");
        }
    });
});
//Campground Update
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
    var campground = {
        name    : req.body.campName,
        image   : req.body.campLink,
        desc    : req.body.campDesc
    };
    Campground.findByIdAndUpdate(req.params.id,campground,function(err,foundCamp){
        if(err){
            console.log(err);
            req.flash("error","Cannot update campground.");
            res.redirect("back");
        }else{
            req.flash("success","Campground Updated!");
            res.redirect("/campgrounds/"+campground._id);
        }
    });
});
//Campground Edit Page
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
    var id  = req.params.id;
    Campground.findById(id,function(err,foundCamp){
        if(err){
            console.log(err);
        }else{
            res.render("campground/edit",{campground:foundCamp,currentUser:req.user});
        }
    }); 
});


module.exports = router;