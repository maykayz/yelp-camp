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
    LocalStrategy  = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    User            = require("./models/user");


    app.use(methodOverride("_method"));
    app.set("view engine","ejs");
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(express.static("public"));
//    seedDB();
//===== Passport setup ===========//

    app.use(require('express-session')({
        secret              : "Omg Open AI Bot just beat Dendi. It's not just a bot",
        resave              : false,
        saveUninitialized   : false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

//=================================//

//DATABASE SETUP
if(process.env.DATABASEURL) {
  mongoose.connect(process.env.DATABASEURL,{useMongoClient:true});
} else {
  mongoose.connect('mongodb://localhost/campgroundsDB',{useMongoClient:true});
}

//=============AUTHENTICATION ROUTES====================//
//login post
app.post("/login",passport.authenticate("local",{
    successRedirect :   "/campgrounds",
    failureRedirect :   "/"
    })
);
//register get
app.get("/register",function(req,res){
    res.render("register");
});
//register post
app.post("/register",function(req,res){
    User.register(new User({username:req.body.username,email:req.body.email,profilepic:"../../public/images/1.png"}),
                  req.body.password,function(err,user){
                        if(err){
                            console.log(err);
                            return res.redirect("/register");
                        }
                            passport.authenticate("local")(req,res,function(){
                               res.redirect("/campgrounds"); 
                            });
                    }
    );
});
//logout
app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/");
});
//=================================//  
//ROUTES
app.get("/",function(req,res){
    res.render("landing");
});
// ---------CAMPGROUND ROUTES--------- //
//INDEX
app.get("/campgrounds",isLoggedIn,function(req,res){
    //retrieve campgrounds from database
    Campground.find({},function(err,foundcampgrounds){
        if(err){
            console.log(err);
            res.render("campground/campgrounds");
        }else{
            res.render("campground/campgrounds",{campgrounds:foundcampgrounds});
            console.log("found campgrounds")
        }
    });

});
//CREATE
app.post("/campgrounds",isLoggedIn,function(req,res){
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
                console.log();
                res.redirect("/campgrounds");
            }
        });
    }else
        res.redirect("/campgrounds/new");
});
//NEW
app.get("/campgrounds/new",isLoggedIn,function(req,res){
    res.render("campground/createNew");
});
//SHOW
app.get("/campgrounds/:id",isLoggedIn,function(req,res){
    var id = req.params.id;
    Campground.findById(id).populate("comments").exec(function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            res.render("campground/show",{campground:campground,moment:moment});
            console.log("Show");
        }
    });
});
app.delete("/campgrounds/:id",isLoggedIn,function(req,res){
    //find campground and delete from db
    Campground.findByIdAndRemove(req.params.id,function(err,deletedCamp){
        if(err){
            console.log(err);
            //redirect
            res.redirect("/campgrounds");
        }else{
            console.log(deletedCamp+"DELETED");
            //redirect
            res.redirect("/campgrounds");
        }
    });
});
app.put("/campgrounds/:id",isLoggedIn,function(req,res){
//    var campground = {
//        name    : req.,
//        image   : ,
//        desc    : 
//    };
//    Campground.findByIdAndUpdate(req.params.id,campground,function(err,foundCamp){
//        if(err){
//            console.log(err);
//            res.redirect("/campgrounds/"+campground._id);
//        }else{
//            res.send("Hi");
//        }
//    });
});
app.get("/campgrounds/:id/edit",isLoggedIn,function(req,res){
    res.render("edit");
});
// ---------------------------------- //
// ----------COMMENT ROUTES---------- //
// adding comment
app.post("/campgrounds/:id/comments",isLoggedIn,function(req,res){
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


function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
        res.redirect("/");
}
