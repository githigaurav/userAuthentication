const mongoose = require("mongoose")

const userSchema=new mongoose.Schema({
    name:{
        type:String,
       
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    data: {
        type: Array,
        default: []
    }
})

const dbUser = mongoose.model("dbUser", userSchema, "usersData")
module.exports=dbUser