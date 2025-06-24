const express = require('express')
const rR = express.Router()
const rC = require('../controllers/rC')
const path = require('path')

rR.get('/',rC.handleRefreshToken)

module.exports = rR
