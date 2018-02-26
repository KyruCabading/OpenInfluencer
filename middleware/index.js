// Middleware
var Comment = require("../models/comment"),
    Influencer = require("../models/influencer");
    
var middleware = {};


middleware.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that")
    res.redirect("/login");
}

middleware.isOwnerInfluencer = function(req, res, next) {
    if(req.isAuthenticated()){
        Influencer.findById(req.params.id, function(err, influencer){
            if(err){
                req.flash("error", "Influencer not found");
                res.redirect("back");
            } else {
                if(influencer.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });        
    } else {
        req.flash("error", "You need to be logged to do that");
        res.redirect("back");
    }
}

middleware.isOwnerComment = function(req, res, next) {
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, comment){
            if(err){
                res.redirect("back");
            } else {
                if(comment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });        
    } else {
        req.flash("error", "You need to be logged to do that");
        res.redirect("back");
    }
}
module.exports = middleware;