'use strict'

const express = require('express')
const router = express.Router()
const authController = require('../../controllers/auth.controller')
const validator = require('express-validation')
const validation = require('../../validations/user.validation')

router.post('/register', validator(validation.create), authController.register) // validate and register
router.post('/login', authController.login) // login
router.get('/confirm', authController.confirm)

module.exports = router
