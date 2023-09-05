const jwt = require("jsonwebtoken")




const verifyUser = function (req, res, next){
    const token = req.cookies.token
    jwt.verify(token, process.env.SECKEY)
    .then((data)=>{
        console.log(data)
    })
    .catch((error)=>{
        console.log(error + "Token")
    })
}



module.exports={verifyUser}