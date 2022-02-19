const { login, register, dashboard } = require('../controllers/userControllers')
const authenticateUser = require('../middlewares/authMiddleware')

const router = require('express').Router()

router.route('/login').post(login)
router.route('/register').post(register)
router.route('/dashboard').get(authenticateUser,dashboard)

module.exports = router