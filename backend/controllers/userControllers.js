const AsyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes')
const bcrypt = require('bcrypt')

const register = AsyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    // validate inputs
    if(!name || !email || !password) {
        res.status(StatusCodes.BAD_REQUEST)
        throw Error("Please fill in all fields")
    }

    // check if user is already created
    const userExists = await User.findOne({email})
    if(userExists) {
        res.status(StatusCodes.BAD_REQUEST)
        throw Error(" Oops! User already Exists")
    }
    // create user
    const user = await User.create(req.body)

    if(user) {
        res.status(StatusCodes.CREATED).json({
            name: user.name,
            email: user.email,
            token: generateToken(user.email)
        })
    } else {
        res.status(StatusCodes.BAD_REQUEST)
        throw Error('User not created')
    }
    
})


const login = AsyncHandler(async (req, res) => {
    const {email, password} = req.body
    // validate inputs
    if(!email || !password) {
        throw Error("Please fill in all fields")
    }

    // check if user exists
    const validateUser = await User.findOne({email})

    if(validateUser && (await bcrypt.compare(password, validateUser.password) )) {
        res.status(StatusCodes.OK).json({
            email: validateUser.email,
            name: validateUser.name,
            token: generateToken(validateUser.email)
        })
    } else {
        throw Error('User not found')
    }
})


const dashboard = AsyncHandler(async (req, res) => {
    const user = await User.findOne({_id: req.user._id}).select('-password')
    res.status(StatusCodes.OK).send(user)
})

const generateToken = (email) => {
    return jwt.sign({email}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}


module.exports = { login, register, dashboard}