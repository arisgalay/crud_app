const express = require('express')
const usersController = require('../controller/user-controller')
const auth = require('../middleware/auth')
const router = express.Router()

router.post('/signup', usersController.signUp).post('/signin', usersController.signIn)
router.get('/profile', auth, usersController.getUser)

module.exports = router
