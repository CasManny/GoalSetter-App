const { login, register, dashboard } = require('../controllers/userControllers')

const router = require('express').Router()

router.route('/login').post(login)
router.route('/register').post(register)
router.route('/dashboard').get(dashboard)

module.exports = router