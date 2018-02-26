var mongoose = require("mongoose");
// SCHEMA SETUP
var influencerSchema = new mongoose.Schema({
    name: String,
    picture: String,
    description: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Influencer", influencerSchema);