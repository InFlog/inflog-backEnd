const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// const serviceSchema = new Schema({
//     header: { type: String },
//     subHeading: { type: String },
//     serviceDes: { type: String }
// })

const brandSchema = new Schema({
    brandName: { type: String, required: true },
    description: { type: String },
    password: { type: String, required: true },
    pastProjects: [],
    posts: [],
    services: [],
    reviews: [],
    category: { type: String }

});

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;