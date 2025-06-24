const express = require('express')
const aR = express.Router()
const path = require('path')

const aC = require('../controllers/aC')

aR.post('/',aC.hL)

module.exports = aR
