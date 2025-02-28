const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/product');
const engine = require('ejs-mate');
const cloudinary = require('cloudinary').v2
const methodOverride = require('method-override');

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Import Routes
const productRoutes = require('./routes/products');

// Set up view engine
const app = express();
app.set('view engine', 'ejs');
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));


// Use the /products route from routes/products.js
app.use('/products', productRoutes);

// Category route
app.get('/products/category/:categoryName', async (req, res) => {
    const categoryName = req.params.categoryName;
    const products = await Product.find({ category: categoryName });
    res.render('categoryShow', { products });
});

// Home route
app.get('/', (req, res) => {
    res.render('home');
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
