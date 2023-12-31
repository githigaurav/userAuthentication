require('dotenv').config()
require("./connection/connection")
const express = require("express")
const server= express()
const cors = require('cors')
const cookieParser= require("cookie-parser")


// Setting up Server
server.use(cors({
    origin: true,
    credentials: true }))
server.use(express.json())
server.use(cookieParser())

// Application Level Middleware 

// server.use((req, res , next)=>{
//     if(req.headers.origin === "http://www.higaurav.com"){

//         next()
//     }else{
  
//         res.status(500).json({message:"Access Denied"})
//     }
// })

// user Routes
const userRoutes = require('./routes/userRoutes')


server.use("/user", userRoutes)





PORT = process.env.PORT || 3002

server.listen(PORT,()=>{
    console.log("Server Status:OK " + PORT)
})
