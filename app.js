//SETUP
var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    Campground      = require('./models/campground'),
    methodOverride  = require("method-override"),
    seedDB          = require("./seeds"),
    Comment         = require("./models/comment"),
    moment          = require("moment"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    User            = require("./models/user"),
    flash           = require("connect-flash");
//===============Routes==================//  
var commentRoutes   = require("./routes/comments"),
    campgroundRoutes= require("./routes/campgrounds"),
    indexRoutes     = require("./routes/index");
//=================================//      
    app.use(methodOverride("_method"));
    app.set("view engine","ejs");
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(express.static("public"));
//    seedDB();

//===== Passport setup ===========//

    app.use(require('express-session')({
        secret              : "Omg Open AI Bot just beat Dendi. It's not just a bot.",
        resave              : false,
        saveUninitialized   : false
    }));

    app.use(flash());
    app.use(function(req,res,next){
        res.locals.currentUser = req.user;
        res.locals.error     = req.flash("error");
        res.locals.success   = req.flash("success");   
        next();
    });

    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
//

//=============Routes setup====================//
    app.use("/",indexRoutes);
    app.use("/campgrounds",campgroundRoutes);
    app.use("/campgrounds/:id/comments",commentRoutes);
//=================================//

//========Database Setup=========================//  
if(process.env.DATABASEURL) {
  mongoose.connect(process.env.DATABASEURL,{useMongoClient:true});
} else {
  mongoose.connect('mongodb://localhost/campgroundsDB',{useMongoClient:true});
}

//=================================//  
//LISTEN
app.listen(process.env.PORT || 3000,function(){
    console.log("Yelp Camp has started");
});



