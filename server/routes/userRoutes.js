const express = require('express')
const userRoute= express.Router()

// user Controllers
const {userReg, userLogin}= require("./../controllers/userControllers")

userRoute.post("/register",(req,res)=>{
    userReg(req, res)
})

userRoute.post("/login", (req , res)=>{
    userLogin(req, res)
})












module.exports=userRoute