const express = require('express');
const router = express.Router();
const Product = require('../models/product')
const mongoose = require('mongoose');
const product = require('../models/product');

// Define the route for /products
router.get('/', async(req, res) => {
    const products = await Product.find(); 
    res.render('products', {products});  
});
router.get('/new', (req, res) => {
    res.render('newProduct'); // productForm.ejs dosyasını render et
});


router.post('/', async(req, res) => {
    const newProduct = new Product(req.body.product)
    await newProduct.save()
    console.log(newProduct)
    res.redirect(`/products/${newProduct._id}`) //redirect kontrol et

})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    
    // Check if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send('Invalid Product ID');
    }

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).send('Product not found');
        }

        res.render('show', { product });
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
});

router.get('/:id/edit', async(req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send('Invalid Product ID');
    }
    try {
        const product = await Product.findById(id)
        if(!product){
            return res.status(400).send("Product not found")
        }
        res.render(`editProduct`, {product})
    } catch (error) {
        console.log(error)
        res.status(500).send("server error")
    }
    
})

router.put('/:id', async(req,res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send('Invalid Product ID');
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body.product,{new: true})
        if (!updatedProduct) {
            return res.status(404).send('Product not found');
        }
        res.redirect(`${updatedProduct._id}`)
    } catch (error) {
        console.log(error)
        res.status(500).send("server error")
    }
    
})




module.exports = router;
