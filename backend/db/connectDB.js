const mongoose = require('mongoose')
const AsyncHandler = require('express-async-handler')

const connectDB = AsyncHandler(async (url) => {
     await mongoose.connect(url)
})

module.exports = connectDB