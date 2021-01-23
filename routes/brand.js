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
    const subHeader = req.body.subHeader;
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
        subHeader,
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

router.route('/update/:id').post((req, res) => {
    Brand.findById(req.params.id)
        .then(brand => {
            brand.brandName = req.body.brandName;
            brand.description = req.body.description;
            brand.password = req.body.password;
            brand.pastProjects = Array(req.body.pastProjects);
            brand.services = Array(req.body.services);
            brand.posts = Array(req.body.posts);
            brand.reviews = Array(req.body.reviews);
            brand.category = req.body.category;
            brand.subHeader = req.body.subHeader

            brand.save()
                .then(() => res.json(brand))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// search 

router.route('/search/:searchParam').get(async (req, res) => {
    console.log('req.params', req.params.searchParam)
    const test = { brandName: { $regex : new RegExp(req.params.searchParam, "i") }}
    console.log('req.params', test)
    try {
        
        const brand = await Brand.find(test).exec();
      
        res.json(brand);
    } catch (err) {
        res.json('Error:' + err);
    }
})

module.exports = router;