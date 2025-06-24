const {format} = require('date-fns')
const {v4:uuid} = require('uuid')
const path = require('path')
const fs = require('fs')
const fsPromises = fs.promises

const logEvents = async (message,fileName) =>{
    const dateTime = new Date()
    
    const logItem = JSON.stringify({
        timestamp: dateTime.toISOString(),
        uuid: uuid(),
        message: message
    });

    try { 
        if(!fs.existsSync(path.join(__dirname,'..','logs')))
            await fsPromises.mkdir(path.join(__dirname,'..','logs'))
        
        await fsPromises.appendFile(path.join(__dirname,'..','logs',fileName),`${logItem}\n`)
    } catch (error) {
        console.log(error.message)
    }
}

const logger = (req,res,next)=>{
    const message = `${req.method}\t${req.headers.origin}\t${req.url}`;
    logEvents(message,'reqLog.txt')

    console.log(`${req.method} ${req.url}`)
    next()
}

module.exports = {logEvents,logger}