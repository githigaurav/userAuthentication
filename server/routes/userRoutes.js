const express = require('express')
const userRoute= express.Router()

// user Controllers
const {userReg, userLogin, userInfo}= require("./../controllers/userControllers")

// middleware
const {verifyUser} = require("./../middleware/verify")

userRoute.post("/register",(req,res)=>{
    userReg(req, res)
})

userRoute.post("/login", (req , res)=>{
    userLogin(req, res)
})

userRoute.get("/info",verifyUser,(req, res)=>{
    userInfo(req, res)
    
})











module.exports=userRoute