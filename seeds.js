var mongoose = require("mongoose");
var Influencer = require("./models/influencer");
var Comment = require("./models/comment");
var faker = require("faker");

function randomizeInfluencers(number) {
    var influencers = [];
    for(var i = 0; i < number; i++) {
        influencers.push({
            name: faker.name.findName(),
            picture: "http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png",
            description: faker.company.catchPhrase()
        });
    }
    return influencers;
}

function randomizeComments(number) {
    var comments = [];
    for(var i = 0; i < number; i++) {
        comments.push({
            text: faker.hacker.phrase(),
            author: faker.name.findName()
        });
    }
    return comments
}

function randomNumber(min, max){
    return Math.floor((Math.random() * max) + min);
}

function seedDB(){
    Influencer.remove(function(err, data){
        if(!err) {
            console.log("Removed");
        }
    });
    // Influencer.remove({}, function(err){
    //     if(err){
    //         console.log(err);
    //     } else {
    //         console.log("removed Influencers");
    //         Comment.remove({}, function(err){
    //             if(err){
    //                 console.log(err);
    //             } else {
    //                 console.log("removed Comments");
    //                 randomizeInfluencers(4).forEach(function(seed){
    //                     Influencer.create(seed, function(err, influencer){
    //                         if(err){
    //                             console.log(err);
    //                         } else {
    //                             console.log("Added Influencer");
    //                             Comment.create({
    //                                 text: "King in the North!",
    //                                 author: "Jana Vacaro"
    //                             }, function(err, comment){
    //                                 if(err) {
    //                                     console.log(err);
    //                                     console.log("ERROR!");
    //                                 } else {
    //                                     influencer.comments.push(comment._id);
    //                                     influencer.save();
    //                                     console.log("created new comment");
    //                                 }
    //                             });
    //                         }
    //                     });
    //                 });            

    //             }
    //         });
    //     }
    // });
}

module.exports = seedDB;