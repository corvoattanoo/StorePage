const express = require('express')
const User = require('../models/users');
var jwt = require('jsonwebtoken');
const {auth} = require('../middleware')

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

router.get('/login', (req, res) => {
    res.render('users/login')
})

router.post('/login',auth ,async(req, res) => {
    try {
        const {username, password} = req.body
        const user = await User.findOne({username})
        if(!user || (await !user.comparePassword(password))){
            return res.status(401).json({error: "invalid username or password"})
        }

        //jwt olustur
        const token = jwt.sign({userId: user._id}, 'SECRET_KEY', {expiresIn: '1h'})
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 1
        })
        console.log(req.user)
        res.redirect('/products')
    } catch (error) {
        res.status(400).json({error: 'Login failed'})
    }
})


module.exports = router;
