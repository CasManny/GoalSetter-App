require('dotenv').config()
const express = require('express')
const AsyncHandler = require('express-async-handler');
const connectDB = require('./db/connectDB');
const app = express()
const userRoutes = require('./routes/userRoutes')

const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Routes
app.use('/api/v1/user/auth', userRoutes)

const start = AsyncHandler(async () => {
    await connectDB(process.env.MONGODB_CONNECT)
    console.log('connected to database')
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
})

start()
