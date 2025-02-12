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
  const subHeader = req.body.subHeader;
  const contact = req.body.contact;
  const followers = Number(req.body.followers);
  const posts = req.body.posts;
  const services = req.body.services;
  const reviews = req.body.reviews;
  const category = req.body.category;
  const image = req.body.image


  const newInfluencer = new Influencer({
    influencerName,
    description,
    subHeader,
    password,
    followers,
    posts,
    services,
    reviews,
    category,
    contact,
    image
  });

  try {
    const savedInfluencer = await newInfluencer.save();
    res.json(savedInfluencer);
  } catch (err) {
    res.json('Error: ' + err);
  }
})


router.route('/:id').get((req, res) => {
  Influencer.findById(req.params.id)
    .then(influencer => res.json(influencer))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Influencer.findById(req.params.id)
    .then(influencer => {
      influencer.influencerName = req.body.influencerName;
      influencer.description = req.body.description;
      influencer.password = req.body.password;
      influencer.followers = req.body.followers;
      influencer.services = req.body.services;
      influencer.posts = req.body.posts;
      influencer.reviews = req.body.reviews;
      influencer.category = req.body.category;
      influencer.subHeader = req.body.subHeader;
      influencer.contact = req.body.contact;
      influencer.image = req.body.image
      influencer.save()
        .then(() => res.json(influencer))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// search 

router.route('/search/:searchParam').get(async (req, res) => {
  console.log('req.params', req.params.searchParam)
  const test = { brandName: { $regex: new RegExp(req.params.searchParam, "i") } }
  console.log('req.params', test)
  try {

    const influencer = await Influencer.find(test).exec();

    res.json(influencer);
  } catch (err) {
    res.json('Error:' + err);
  }
})

module.exports = router;
