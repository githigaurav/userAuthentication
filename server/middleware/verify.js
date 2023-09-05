const jwt = require("jsonwebtoken")




const verifyUser = async function (req, res, next){
    try{
        // 
    
    const token = req.cookies.token
    const result =  jwt.verify(token, process.env.SECKEY)
    if(result){
        req.data=result.userID
        next()
    }else{
        res.status(400).json({message:"Login is required"})
    }
}
catch(error){       

        res.status(400).json({message:error.message}) 
    
   
}
    // .then((data)=>{
    //     console.log(data)
    // })
    // .catch((error)=>{
    //     console.log(error + "Token")
    // })
}



module.exports={verifyUser}