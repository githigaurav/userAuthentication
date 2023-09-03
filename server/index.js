require('dotenv').config()
const express = require("express")
const server= express()










PORT = process.env.PORT || 3002
server.listen(PORT,()=>{
    console.log("Server Status:OK " + PORT)
})