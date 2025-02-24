const mongoose = require('mongoose')
const {Schema} = mongoose

const productsSchema = new Schema({
    name: {
        type: String,
        required: true 
    },
    price: {
        type: Number,
        required: true
    },
    description: String,
    image: String,
    category: String,
    createdAt: Date
})

module.exports = mongoose.model('Product', productsSchema)