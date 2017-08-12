//SETUP
var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    Campground      = require('./models/campground'),
    methodOverride  = require("method-override"),
    seedDB          = require("./seeds"),
    Comment         = require("./models/comment"),
    moment          = require("moment");


    app.use(methodOverride("_method"));
    app.set("view engine","ejs");
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(express.static("public"));
//    seedDB();

//DATABASE SETUP
    var url = process.env.DATABASEURL;
//    var url = process.env.DATABASEURL || 'mongodb://localhost/campDB' || 'mongodb://localhost/campgroundsDB';
    //connect mongoose to db
    mongoose.connect('mongodb://maykhattar:Moon13468mlab@ds129003.mlab.com:29003/yelpcamp',{useMongoClient:true});
    
//ROUTES
app.get("/",function(req,res){
    res.render("landing");
});
// ---------CAMPGROUND ROUTES--------- //
//INDEX
app.get("/campgrounds",function(req,res){
    //retrieve campgrounds from database
    Campground.find({},function(err,foundcampgrounds){
        if(err){
            console.log(err);
            res.render("campgrounds");
        }else{
            res.render("campgrounds",{campgrounds:foundcampgrounds});
        }
    });

});
//CREATE
app.post("/campgrounds",function(req,res){
    var campName = req.body.campName;
    var campLink = req.body.campLink;
    var campDesc = req.body.campDesc;
    if(campName && campLink && campDesc){
       Campground.create({
        name:campName,
        image:campLink,
        desc:campDesc
    },function(err,camp){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds");
            
        }
    });
    }else(res.redirect("/campgrounds/new"));
});
//NEW
app.get("/campgrounds/new",function(req,res){
    res.render("createNew");
});
//SHOW
app.get("/campgrounds/:id",function(req,res){
    var id = req.params.id;
    Campground.findById(id).populate("comments").exec(function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            res.render("show",{campground:campground,moment:moment});
            console.log("Show");
        }
    });
});
app.delete("/campgrounds/:id",function(req,res){
    //find campground and delete from db
    Campground.findByIdAndRemove(req.params.id,function(err,deletedCamp){
        if(err){
            console.log(err);
            //redirect
            res.render("/campgrounds");
        }else{
            console.log(deletedCamp+"DELETED");
            //redirect
            res.redirect("/campgrounds");
        }
    });
});
// ---------------------------------- //
// ----------COMMENT ROUTES---------- //
// adding comment
app.post("/campgrounds/:id/comments",function(req,res){
    var cuser = "Kenny";
    var ctext = req.body.commenttext;
    Campground.findById(req.params.id).populate("comments").exec(function(err,campground){
        if(err){
            console.log(err);
        }else{
            Comment.create({
                user    : cuser,
                text    : ctext,
                time    : moment()
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

// ---------------------------------- //
//LISTEN
app.listen(process.env.PORT || 3000,function(){
    console.log("Yelp Camp has started");
});

