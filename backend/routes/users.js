const express = require('express')
const usersController = require('../controller/user-controller')
const router = express.Router()

router.post('/signup', usersController.signUp).post('/signin', usersController.signIn)

module.exports = router
