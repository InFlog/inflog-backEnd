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

router.route('/search/:searchParam').get(async (req, res) => {
    console.log('req.params', req.params.searchParam)
    const test = { influencerName: { $regex : new RegExp(req.params.searchParam, "i") }}
    console.log('req.params', test)
    try {
        
        const influencer = await Influencer.find(test).exec();
      
        res.json(influencer);
    } catch (err) {
        res.json('Error:' + err);
    }
})

router.route('/add').post(async (req, res) => {
    const influencerName = req.body.influencerName;
    const description = req.body.description;
    const password = req.body.password;
    const subHeader = req.body.subHeader;
    const contact = req.body.contact;
    const followers = Number(req.body.followers);
    const posts = Array(req.body.posts);
    const services = Array(req.body.services);
    const reviews = Array(req.body.reviews);
    const category = req.body.category;


    const newInfluencer = new Influencer({
        influencerName,
        description,
        // contact,
        subHeader,
        password,
        followers,
        posts,
        services,
        reviews,
        category,
    });

    try {
        const savedInfluencer = await newInfluencer.save();
        res.json(savedInfluencer);
    } catch (err) {
        res.json('Error: ' + err);
    }
})

router.route('/update/:id').post((req, res) => {
    Influencer.findById(req.params.id)
        .then(influencer => {
            influencer.influencerName = req.body.influencerName;
            influencer.description = req.body.description;
            influencer.password = req.body.password;
            influencer.followers = req.body.followers;
            influencer.services = Array(req.body.services);
            influencer.posts = Array(req.body.posts);
            influencer.reviews = Array(req.body.reviews);
            influencer.category = req.body.category;
            influencer.subHeader = req.body.subHeader;
            // influencer.contact = req.body.contact;

            influencer.save()
                .then(() => res.json(influencer))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router; 