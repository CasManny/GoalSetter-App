const User = require('../models/userModel')
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken')

const authenticateUser = async ( req, res, next) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
        token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findOne({email: decoded.email})
      next()
    } else {
      res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Not unauthorized" });
    }

}

module.exports = authenticateUser