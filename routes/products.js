const express = require('express');
const router = express.Router();
const Product = require('../models/product')

// Define the route for /products
router.get('/', async(req, res) => {
    const products = await Product.findOne({name: "Wireless Earbuds"})
    res.render('products', {products});  
});

router.get('/:id', async(req, res) => {
    const productId = req.params.id
    console.log(req.params.id)
    const products = await Product.findById(productId)
    res.render('show', {products})
})

module.exports = router;
