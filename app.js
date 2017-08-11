//SETUP
var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");
var methodOverride = require("method-override");
    app.use(methodOverride("_method"));
    //set view engine to ejs
    app.set("view engine","ejs");
    //use bodyParser
    app.use(bodyParser.urlencoded({extended:true}));
    //add css folder
    app.use(express.static("public"));

//DATABASE SETUP
    //connect mongoose to db
    mongoose.connect('mongodb://localhost/campgroundsDB',{useMongoClient:true});
    
    //create schema
    var campgroundSchema = new mongoose.Schema({
        name:String,
        image:String,
        desc:String
    });
    //compilte schema to model
    var Campground = mongoose.model("Campground",campgroundSchema);
    

//ROUTES
app.get("/",function(req,res){
    res.render("landing");
});
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
            res.render("campgrounds",{alert:true});
            
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
    Campground.findById(id,function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            res.render("show",{campground:campground});
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

//LISTEN
app.listen(process.env.PORT || 3000),function(){
    console.log("Yelp Camp has started");
});