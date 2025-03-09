const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/product');
const engine = require('ejs-mate');
const methodOverride = require('method-override');
const session = require('express-session')
const cookieParser = require('cookie-parser');
const app = express();

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use(cookieParser());
// Import Routes
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');
const MongoStore = require('connect-mongo');

// Set up view engine

app.set('view engine', 'ejs');
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));





// Use the /products route from routes/products.js
app.use('/products', productRoutes);
app.use('/users', userRoutes)


const sessionConfig = {
    secret: 'thisshouldbeabettersecret',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/ecommerce'
    }),
    cookie: {
        httpOnly: true,  // Tarayıcıdan erişilemez (güvenlik için)
        secure: false,   // HTTPS zorunlu değil (lokal geliştirme için)
        maxAge: 1000 * 60 * 60 * 24 * 7  // 7 gün (session süresi)
    }
}

app.use(session(sessionConfig))


// Category route
app.get('/products/category/:categoryName', async (req, res) => {
    const categoryName = req.params.categoryName;
    const products = await Product.find({ category: categoryName });
    res.render('categoryShow', { products });
});

// app.get('/set-session', (req, res) => {
//     req.session.username = "Yigit";  
//     res.send("Session kaydedildi!");
// });

// app.get('/get-session', (req, res) => {
//     res.send(`Session Username: ${req.session.username}`);
// });


// Home route
app.get('/', (req, res) => {
    res.render('home');
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
