const express = require('express')
const regR = express.Router()
const path = require('path')

const regC = require('../controllers/regC')

regR.post('/',regC.handleNewUser)

module.exports = regR
