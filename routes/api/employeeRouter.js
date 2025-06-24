const express = require('express')
const employeeRouter = express.Router()
const { gAE, gE, uE, cE, dE} = require('../../controllers/eC')
const ROLES_LIST = require('../../config/roles_list')
const verifyRoles = require('../../middleware/verifyRoles')

employeeRouter.route('/')
    .get(gAE)
    .put(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),uE)  
    .post(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),cE)
    .delete(verifyRoles(ROLES_LIST.Admin),dE)

employeeRouter.route('/:id')
    .get(gE)

module.exports = employeeRouter
