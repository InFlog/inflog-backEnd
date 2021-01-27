const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// const serviceSchema = new Schema({
//     header: { type: String },
//     subHeading: { type: String },
//     serviceDes: { type: String }
// })

const brandSchema = new Schema({
    brandName: { type: String },
    description: { type: String },
    password: { type: String },
    subHeader: { type: String },
    pastProjects: [],
    posts: [],
    services: [],
    reviews: [],
    category: { type: String },
    contact: { type: String },
    image: { type: String }

});

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;