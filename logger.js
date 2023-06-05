const {Console} = require("console")
const fs =require('fs')
const errorLog = fs.createWriteStream('error.log')
const infoLog = fs.createWriteStream('info.log')

const logger= new Console({stdout:infoLog, stderr:errorLog})


module.exports={logger}





