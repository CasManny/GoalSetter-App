const { StatusCodes } = require("http-status-codes");

const ErrorHandler = (err, req, res, next) => {
  if (err.message === "Please fill in all fields") {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please fill in all fields" });
  }
  if (err.message === "User not found") {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "User not found" });
  }
  if (err.message === "Oops! User already Exists") {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Oops! User already Exists" });
  }
  if (err.message === "User not authorized") {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "User not authorized" });
  } next();
};


module.exports = ErrorHandler;
