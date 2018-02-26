var express = require("express"),
    router = express.Router({mergeParams: true}),
    Comment = require("../models/comment"),
    Influencer = require("../models/influencer"),
    middleware = require("../middleware");


// Create Form
router.get("/new", middleware.isLoggedIn, function(req, res){
    Influencer.findById(req.params.id, function(err,influencer){
        if(err) {
            console.log(err);
        } else {
            res.render("comments/new", {influencer: influencer});
        }
    });
});

// Create
router.post("/", middleware.isLoggedIn, function(req, res){
    Influencer.findById(req.params.id, function(err, influencer){
        if(err){
            console.log(err);
            res.redirect("/influencers");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err) {
                    req.flash("error", "Something went wrong");
                    console.log(err);
                } else {
                    // add username & id to comment
                    console.log(req.user);
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    influencer.comments.push(comment._id);
                    influencer.save();
                    console.log(comment);
                    req.flash("success", "Successfully added comment");
                    res.redirect("/influencers/" + req.params.id)
                }
            });
        }
    })
    
});

// Edit Form
router.get("/:comment_id/edit", middleware.isOwnerComment, function(req, res){
    Comment.findById(req.params.comment_id, function(err, comment){
        if(err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", {influencerId: req.params.id, comment: comment});
        }
    });
});

// Edit
router.put("/:comment_id", middleware.isOwnerComment, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err) {
            res.redirect("back");
        } else {
            res.redirect("/influencers/" + req.params.id);
        }
    });
});

// Destroy
router.delete("/:comment_id", middleware.isOwnerComment, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted")
            res.redirect("/influencers/" + req.params.id);
        }
    });
});

module.exports = router;