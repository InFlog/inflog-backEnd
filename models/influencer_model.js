const mongoose = require('mongoose');

const Schema = mongoose.Schema;



const influencerSchema = new Schema({
    influencerName: { type: String, required: true },
    description: { type: String },
    password: { type: String, required: true },
    followers: { type: Number },
    posts: [],
    services: [],
    reviews: [],
    category: { type: String },
    subHeader: { type: String },
    // contact: { type: String }
});

const Influencer = mongoose.model('Influencer', influencerSchema);

module.exports = Influencer;