const router = require('express').Router();
let Influencer = require('../models/influencer_model');

router.route('/').get(async (req, res) => {
    try {
        const influencer = await Influencer.find();
        res.json(influencer);
    } catch (err) {
        res.json('Error:' + err);
    }
})


router.route('/add').post(async (req, res) => {
    const influencerName = req.body.influencerName;
    const description = req.body.description;
    const password = req.body.password;
    const followers = Number(req.body.followers);
    const posts = Array(req.body.posts);
    const services = Array(req.body.services);
    const reviews = Array(req.body.reviews);
    const category = req.body.category;

    const newInfluencer = new Influencer({
        influencerName,
        description,
        password,
        followers,
        posts,
        services,
        reviews,
        category
    });

    try {
        const savedInfluencer = await newInfluencer.save();
        res.json(savedInfluencer);
    } catch (err) {
        res.json('Error: ' + err);
    }
})


module.exports = router; 