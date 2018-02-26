var express = require("express"),
    router = express.Router(),
    Influencer = require("../models/influencer"),
    middleware = require("../middleware");

// Show Influencers
router.get("/", function(req, res){
    // Get all campgrounds from DB
    Influencer.find({}, function(err, influencers){
        if(err) {
            console.log(err);
        } else {
            res.render("influencers/index", {influencers: influencers});
        }
    });
});

// New Influencer: Form
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("influencers/new");
});

// Add Influencer: Post
router.post("/", middleware.isLoggedIn, function(req, res){
    // Get data from form and add to campgrounds array
    var name = req.body.name,
        picture = req.body.picture,
        description = req.body.description,
        author = {
            id: req.user._id,
            username: req.user.username
        },
        newInfluencer = {name: name, picture: picture, description: description, author: author}        
        
    Influencer.create(newInfluencer, function(err,obj){
        if(err){
            console.log(err);
        } else {
            console.log(Influencer)
            res.redirect("/influencers");
        }
    });
}); 

// Edit Form Influencer
router.get("/:id/edit", middleware.isOwnerInfluencer, function(req, res){ 
    Influencer.findById(req.params.id, function(err, influencer) {
        res.render("influencers/edit", {influencer: influencer});
    });
});

router.put("/:id", middleware.isOwnerInfluencer, function(req, res) {
    Influencer.findByIdAndUpdate(req.params.id, req.body.influencer, function(err, influencer){
        if (err) {
            res.redirect("/influencers");
        } else {
            res.redirect("/influencers/" + req.params.id);
        }
    })
})

// Destroy Route 
router.delete("/:id", middleware.isOwnerInfluencer, function(req, res){
    Influencer.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/influencers");
        } else {
            res.redirect("/influencers");
        }
    })
});

// Update Influencer

// Show Influencer Details
router.get("/:id", function(req, res){
    Influencer.findById(req.params.id).populate("comments").exec(function(err, influencer){
            if(err){
                console.log(err)
            } else {
                res.render("influencers/show", {influencer: influencer});
            }
    });
});

module.exports = router;