const uDB = {
  users: require("../models/users.json"),
  setUsers : function(data) {this.users = data}
};

const fsP = require('fs').promises
const pth = require('path')
const bc = require("bcrypt")
const jwt = require('jsonwebtoken')
require('dotenv').config()


const hL=async(req,res)=>{
    const {username,password} = req.body;
    if(!username || !password)
        return res.status(400).json({"message":"Username and password required"})

    const fU = uDB.users.find(user=> user.username===username)
    if(!fU)
        return res.sendStatus(401)

    const rls = Object.values(fU.roles)
    const mtch = await bc.compare(password,fU.password)
    if(mtch){
        const aT = jwt.sign(
            {
                "UserInfo":{
                    'username':fU.username,
                    "roles":rls
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'120s'}
        )
        const rT = jwt.sign(
            {'username':fU.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:'1d'}
        )
        const oU = uDB.users.filter(person=>person.username!==fU.username)
        const cU = {...fU,rT}
        uDB.setUsers([...oU,cU])
        console.log(uDB.users)
        fsP.writeFile(
            pth.join(__dirname,'..','models','users.json'),  
            JSON.stringify(uDB.users)
        )
        res.cookie('jwt',rT,{httpOnly:true,sameSite:'none',secure:true})
        res.json({aT})
    }
    else
        res.sendStatus(401)
}

module.exports ={hL}
