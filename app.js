const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose')
const Product = require('./models/product')

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Import routes
const productRoutes = require('./routes/products'); // Import product routes

// Set up view engine
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Use the /products route from routes/products.js
app.use('/products', productRoutes);


app.get('/products/category/:categoryName', async(req, res) => {
    const categoryName = req.params.categoryName
    const products = await Product.find({category: categoryName})
    res.render('categoryShow', {products})
})

// Home route
app.get('/', (req, res) => {
    res.render('home');
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
