var express = require('express');
var router  = express.Router();
var passport = require("passport"),
    User    = require("../models/user");

//=================================//  

//Root Route
router.get("/",function(req,res){
    res.render("landing");
});

//=============AUTHENTICATION ROUTES====================//
//Login 
router.post("/login",passport.authenticate("local",{
    successRedirect :   "/campgrounds",
    failureRedirect :   "/"
    })
);
//Get Register Page
router.get("/register",function(req,res){
    res.render("register",{currentUser:null});
});
//register post
router.post("/register",function(req,res){
    User.register(new User({username:req.body.username,email:req.body.email,profilepic:req.body.profilepic}),
                  req.body.password,function(err,user){
                        if(err){
                            console.log(err);
                            req.flash("error","Registration Failed!");
                            return res.redirect("/register");
                        }
                            passport.authenticate("local")(req,res,function(){
                               req.flash("success","Register complete! Welcome "+user.username);
                               res.redirect("/campgrounds"); 
                            });
                    }
    );
});
//logout
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","Successfully Logged Out.");
    res.redirect("/");
});

//=================================//  
//Middleware to check if a user is logged in

//=================================//  
//Module export
module.exports = router;