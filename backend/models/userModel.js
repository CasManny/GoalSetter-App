const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter a name"]
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minLength: [3, "password should be more than 3 characters"]
    },
    email: {
        type: String,
        required: [true, "please Enter an email"],
        unique: true,
    }
}, { timestamps: true})

userSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})



module.exports = mongoose.model("User", userSchema)