const mongoose = require('mongoose')
const Products = require('../models/product')

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

const seedProducts = async () => {
    await Products.deleteMany({})

const products = [
    { "name": "Wireless Earbuds", "price": 59.99, "description": "Noise-canceling earbuds with Bluetooth 5.0.", "image": "https://example.com/earbuds.jpg", "category": "Electronics" },
    { "name": "Smartwatch", "price": 199.99, "description": "Fitness tracker with heart rate monitor.", "image": "https://example.com/smartwatch.jpg", "category": "Wearables" },
    { "name": "Gaming Mouse", "price": 49.99, "description": "RGB backlit gaming mouse with adjustable DPI.", "image": "https://example.com/mouse.jpg", "category": "Gaming" },
    { "name": "Mechanical Keyboard", "price": 89.99, "description": "Compact 60% keyboard with blue switches.", "image": "https://example.com/keyboard.jpg", "category": "Gaming" },
    { "name": "Laptop Stand", "price": 29.99, "description": "Adjustable aluminum laptop stand for ergonomic posture.", "image": "https://example.com/stand.jpg", "category": "Accessories" },
    { "name": "4K Monitor", "price": 299.99, "description": "27-inch UHD monitor with HDR support.", "image": "https://example.com/monitor.jpg", "category": "Electronics" },
    { "name": "Bluetooth Speaker", "price": 79.99, "description": "Portable speaker with deep bass and long battery life.", "image": "https://example.com/speaker.jpg", "category": "Audio" },
    { "name": "External SSD", "price": 119.99, "description": "1TB NVMe external solid-state drive.", "image": "https://example.com/ssd.jpg", "category": "Storage" },
    { "name": "Smart LED Bulb", "price": 19.99, "description": "Color-changing LED bulb with voice control.", "image": "https://example.com/bulb.jpg", "category": "Home Automation" },
    { "name": "Electric Toothbrush", "price": 39.99, "description": "Sonic toothbrush with multiple cleaning modes.", "image": "https://example.com/toothbrush.jpg", "category": "Personal Care" },
    { "name": "Wireless Charger", "price": 25.99, "description": "Fast charging pad for Qi-enabled devices.", "image": "https://example.com/charger.jpg", "category": "Accessories" },
    { "name": "Noise-Canceling Headphones", "price": 199.99, "description": "Over-ear headphones with active noise cancellation.", "image": "https://example.com/headphones.jpg", "category": "Audio" },
    { "name": "Portable Power Bank", "price": 34.99, "description": "20,000mAh power bank with fast charging.", "image": "https://example.com/powerbank.jpg", "category": "Accessories" },
    { "name": "Action Camera", "price": 149.99, "description": "Waterproof 4K action camera with wide-angle lens.", "image": "https://example.com/camera.jpg", "category": "Cameras" },
    { "name": "Smart Thermostat", "price": 129.99, "description": "Energy-saving thermostat with app control.", "image": "https://example.com/thermostat.jpg", "category": "Home Automation" },
    { "name": "Robot Vacuum", "price": 249.99, "description": "Self-charging vacuum with smart navigation.", "image": "https://example.com/vacuum.jpg", "category": "Home Appliances" },
    { "name": "Coffee Maker", "price": 99.99, "description": "Programmable coffee maker with built-in grinder.", "image": "https://example.com/coffeemaker.jpg", "category": "Kitchen" },
    { "name": "Electric Kettle", "price": 49.99, "description": "Temperature-controlled electric kettle.", "image": "https://example.com/kettle.jpg", "category": "Kitchen" },
    { "name": "Smart Doorbell", "price": 179.99, "description": "Video doorbell with motion detection.", "image": "https://example.com/doorbell.jpg", "category": "Home Security" },
    { "name": "Adjustable Dumbbells", "price": 199.99, "description": "Compact weight training set for home workouts.", "image": "https://example.com/dumbbells.jpg", "category": "Fitness" },
    { "name": "Yoga Mat", "price": 24.99, "description": "Non-slip yoga mat for all types of workouts.", "image": "https://example.com/yogamat.jpg", "category": "Fitness" },
    { "name": "Running Shoes", "price": 89.99, "description": "Lightweight and breathable running shoes.", "image": "https://example.com/shoes.jpg", "category": "Apparel" },
    { "name": "Hiking Backpack", "price": 69.99, "description": "Water-resistant backpack with multiple compartments.", "image": "https://example.com/backpack.jpg", "category": "Outdoor" },
    { "name": "Camping Tent", "price": 149.99, "description": "Four-person waterproof tent with easy setup.", "image": "https://example.com/tent.jpg", "category": "Outdoor" },
    { "name": "BBQ Grill", "price": 229.99, "description": "Portable charcoal grill for outdoor cooking.", "image": "https://example.com/grill.jpg", "category": "Outdoor" },
    { "name": "Sunglasses", "price": 59.99, "description": "Polarized sunglasses with UV protection.", "image": "https://example.com/sunglasses.jpg", "category": "Accessories" },
    { "name": "Leather Wallet", "price": 39.99, "description": "Slim bifold wallet with RFID protection.", "image": "https://example.com/wallet.jpg", "category": "Accessories" },
    { "name": "Winter Jacket", "price": 129.99, "description": "Insulated waterproof jacket for cold weather.", "image": "https://example.com/jacket.jpg", "category": "Apparel" },
    { "name": "Smart Light Strip", "price": 29.99, "description": "RGB LED light strip with app control.", "image": "https://example.com/lightstrip.jpg", "category": "Home Automation" },
    { "name": "Gaming Chair", "price": 199.99, "description": "Ergonomic chair with lumbar support.", "image": "https://example.com/chair.jpg", "category": "Gaming" },
    { "name": "Desk Organizer", "price": 19.99, "description": "Multi-compartment organizer for office supplies.", "image": "https://example.com/organizer.jpg", "category": "Office" },
    { "name": "Standing Desk", "price": 299.99, "description": "Height-adjustable standing desk for productivity.", "image": "https://example.com/standingdesk.jpg", "category": "Office" },
    { "name": "Smart Mirror", "price": 149.99, "description": "Fitness tracking mirror with virtual trainer.", "image": "https://example.com/mirror.jpg", "category": "Home" },
    { "name": "Wireless Security Camera", "price": 119.99, "description": "1080p HD security camera with night vision.", "image": "https://example.com/camera.jpg", "category": "Home Security" },
    { "name": "Mini Projector", "price": 99.99, "description": "Portable projector for home entertainment.", "image": "https://example.com/projector.jpg", "category": "Electronics" },
    { "name": "Electric Bike", "price": 999.99, "description": "Eco-friendly e-bike with long battery life.", "image": "https://example.com/ebike.jpg", "category": "Outdoor" }
  ]

await Products.insertMany(products)
console.log('seed data inserted!')
mongoose.connection.close();
}

seedProducts()
  