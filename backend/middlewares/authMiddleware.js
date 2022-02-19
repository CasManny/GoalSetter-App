const User = require('../models/userModel')
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken')

const authenticateUser = async ( req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(' ')[1]
        const { email } = await jwt.verify(token, process.env.JWT_SECRET)
        const userData = await User.findOne({email: email}).select('-password')
        req.user = userData
        next()
    } else {
        res.status(StatusCodes.UNAUTHORIZED).json({msg: "Not unauthorized"})
    }
}

module.exports = authenticateUser