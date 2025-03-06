const mongoose = require('mongoose')
const {Schema} = mongoose
const bcrypt = require('bcrypt');

const UsersSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }

})

UsersSchema.pre('save', async function(next){
    if(!this.isModified('password')){return false}
    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (error) {
        return next(error)
    }
});

UsersSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model('User', UsersSchema)