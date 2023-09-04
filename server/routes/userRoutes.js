const express = require('express')
const userRoute= express.Router()

// user Controllers
const {userReg}= require("./../controllers/userControllers")

userRoute.post("/register",(req,res)=>{
    userReg(req, res)
})













module.exports=userRoute