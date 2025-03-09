const jwt = require('jsonwebtoken')
const  Product = require('./models/product')

module.exports.auth = (req, res, next) => {
    const token = req.cookies.token

    if(!token){return res.status(401).send('Error!!! no token')}

    try {
        const decoded = jwt.verify(token,'SECRET_KEY')
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).send('Error!!! invalid token')
    }
}

module.exports.isOwner = async(req, res, next) => {
    try {
        const {id} = req.params
        const product = await Product.findById(id)

        if(!product){return res.status(404).send('Error product not found')}

        if(product.owner.toString() !== req.user.userId){
            return
        }
    } catch (error) {
        
    }
    
}