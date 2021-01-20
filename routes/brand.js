const router = require('express').Router();
let Brand = require('../models/brand_model');

router.route('/').get(async(req, res) => {
    try {
        const brand = await Brand.find();
        res.json(brand);
    } catch (err) {
        res.json('Error:' + err);
    }
})


router.route('/add').post(async(req, res) => {
    const brandName = req.body.brandName;
    const description = req.body.description;
    const password = req.body.password;
    const pastProjects = Array(req.body.pastProjects);
    const posts = Array(req.body.posts);
    const services = Array(req.body.services);
    const reviews = Array(req.body.reviews);
    const category = req.body.category;

    const newBrand = new Brand({
        brandName,
        description,
        password,
        pastProjects,
        posts,
        services,
        reviews,
        category
    });

    try {
        const savedBrand = await newBrand.save();
        res.json(savedBrand);
    } catch (err) {
        res.json('Error: ' + err);
    }
})





module.exports = router;