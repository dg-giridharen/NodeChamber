const express = require('express')
const hR = express.Router()
const path = require('path')

hR.get(/^\/$|^\/index(\.html)?/,(req,res)=>{ 
    res.sendFile(path.join(__dirname,'..','views','index.html'))
})

module.exports = hR
