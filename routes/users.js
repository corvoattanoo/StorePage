const express = require('express')
const User = require('../models/users');

const router = express.Router()

router.get('/register', (req,res) => {
    res.render('users/register')
})

router.post('/register', async(req, res) => {
        // console.log("Gelen Veriler:", req.body); // Terminalde göster
        // res.send(req.body);
    try {
        const {username, password, email} = req.body
        const user = new User({username, email, password})
        await user.save()
        res.redirect('/products')
    } catch (error) {
        console.log('error', error.message)
        res.redirect('/users/register')
    }   
})


module.exports = router;
