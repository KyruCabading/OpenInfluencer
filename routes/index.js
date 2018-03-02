var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    User = require("../models/user");



// ROUTES

router.get("/", function(req, res){
    res.render("landing");
});

// Register
router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username})
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            req.flash("error", err.message);
            res.redirect("register");
        } else {
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "Welcome to OpenInfluencer " + req.body.username);
                res.redirect("/influencers");
            });
        }
    });
});

// Login - Form
router.get("/login", function(req, res){
    res.render("login");
});

// Login - Post
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/influencers",
        failureRedirect: "/login"
    }), function(err, data){
        if(err) {
            console.log(err);
        } else {
            console.log(data);
        }
    });


// Logout
router.get("/logout", function(req, res){
    req.logout();

    req.flash("success", "You are now logged out");
    res.redirect("/influencers");
});



module.exports = router;
