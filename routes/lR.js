const express = require('express')
const lR = express.Router()
const path = require('path')
const {handleLogout} = require('../controllers/lC')

lR.get('/',handleLogout)

module.exports = lR

