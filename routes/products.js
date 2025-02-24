const express = require('express');
const router = express.Router();

// Define the route for /products
router.get('/', (req, res) => {
    res.render('products');  // Render the 'products.ejs' file
});

module.exports = router;
