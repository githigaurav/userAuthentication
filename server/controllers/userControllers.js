const dbUser = require("./../schema/userSchema")
const jwt = require("jsonwebtoken")
const argon = require('argon2')


const isUserExists = async function (email) {
    try {
        const result = await dbUser.find({ email: email })
        return result;
    }
    catch (error) {
        console.log(error + "Errro in isUserExists")
    }
}

const saveUser = async function (userObject) {
    try {
        const user = new dbUser(userObject)
        const result = await user.save()
        return result;
    }
    catch (error) {
        console.log(error + "error in saveUser")
    }
}

const jwtToken= function(userID){
    const token = jwt.sign(userID, process.env.SECKEY,{expiresIn:'1hr'})
    return token
}

const userPassEnc= async function(password){
    try{
        const hash = argon.hash(password)
        return hash;
    }catch(error){
        console.log(error + " Error in userPassEnc")
    }
}
const userReg = async function (req, res) {
    console.log(req.body)
    try {
        const { name, email, password } = req.body
        // Checking user Exists or not
        const result = await isUserExists(email)

        if (result.length !== 0) {
            res.status(409).json({ message: "User already exists" })
        } else {
         // Encrypting Password
            const encPass = await userPassEnc(password)
        // Preparing User Object for MongoDB
            const userObject = {
                name: name,
                email: email,
                password: encPass
            }
        // Sending User Object For Registration
            const userRegStatus = await saveUser(userObject)
        // Checking user Successfully Register or not
            if (userRegStatus && userRegStatus !== null && userRegStatus !== undefined) {
        // extracting user's Mongodb id 
                const userID = userRegStatus._id.toString()
        // generating jwt token for cookie
                const token = jwtToken({ userID })
        // setting cookie in browser
                res.cookie("token", token)
        // sending reponse to client after successfully registration
                res.status(200).json({ message: "User has been registered Successfully" })
            }
        }
    }
    catch (error) {
        console.log(error + "Error in userReg")
        res.status(500).json({ message: "Internal Server Error" })
    }


}

const userPassDec = async function (dbPassword, password){
        const result = await argon.verify(dbPassword,password )
        return result;
}

const userLogin = async function (req, res){
    const  {email , password}=req.body
    const result = await isUserExists(email)
    if(result.length !==0){
        const dbPassword= result[0].password
        const verifyPass = await  userPassDec(dbPassword, password)
            if(verifyPass){
                const userID=result[0]._id.toString()             
                    const token = jwtToken({userID})
                    res.cookie("token",token)
                    res.status(200).json({message:"Login Successfully"})
            }else{
                res.status(404).json({message:"Invalid password"})
            }

    }else{
        res.status(404).json({message:"User not found"})
    }

}
const findUser =  async function (userID){
    return await dbUser.findById(userID)
}

const userInfo= async function (req, res){
    const userID=req.data
    const result = await findUser(userID)
    if(result.length !==0){

     const {password , __v, _id,  ...rest } = result._doc;
    
       res.status(200).json({rest})
        
    }
    
}

module.exports = {userReg , userLogin, userInfo}