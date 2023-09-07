const jwt = require("jsonwebtoken");

const verifyUser = async (req, res, next) => {
    const userIP=req.headers.usercurrentip
    const token = req.cookies.token;
   
    try {
      

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        jwt.verify(token, process.env.SECKEY, (error, decoded) => {
            if (error) {
                
                res.clearCookie("token")
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
                console.log("No ip Generated")
                res.clearCookie("token")
                res.status(500).json({message:"Login is required"})
            }
        });
    } catch (error) {
        res.clearCookie("token")
        res.status(500).json({ message: error.message });
    }
};

module.exports = { verifyUser };
