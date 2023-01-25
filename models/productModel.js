const mongoose = require('mongoose');


let RatingSchema = mongoose.Schema({
    rate: Number,
    count: Number
})

let ProductSchema = mongoose.Schema({
    id: Number,
    title: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    rating: RatingSchema,
})


module.exports = mongoose.model("Product", ProductSchema);