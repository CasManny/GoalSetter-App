const { StatusCodes } = require('http-status-codes')

const ErrorHandler = (err, req, res, next) => {
    if(err.message === "Please fill in all fields") {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: "Please fill in all fields" });
    }
    if (err.message === "User not found") {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: "User not found" });
    } next();
}

module.exports = ErrorHandler