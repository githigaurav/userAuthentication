const jwt = require("jsonwebtoken");

const verifyUser = async (req, res, next) => {
    const userIP=req.headers.usercurrentip
    
   
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        jwt.verify(token, process.env.SECKEY, (error, decoded) => {
            if (error) {
                return res.status(401).json({ message: "Invalid token" });
            }

            console.log(decoded)
            console.log(userIP + "client IP")
            console.log(decoded.userIP + "token ip")
            if(decoded.userIP === userIP && userIP !=='' && userIP!==undefined){
                req.data = decoded.userID;
                next();
            }
            else{
                console.log("error no ip")
                res.status(500).json({message:"Login is required"})
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { verifyUser };
