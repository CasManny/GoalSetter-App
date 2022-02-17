const AsyncHandler = require('express-async-handler')

const login = AsyncHandler(async (req, res) => {
    res.send('login page')
})

const register = AsyncHandler(async (req, res) => {
    res.send('register page')
})

const dashboard = AsyncHandler(async (req, res) => {
    res.send('Get user Dashboard')
})

module.exports = { login, register, dashboard}