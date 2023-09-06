const jwt = require("jsonwebtoken");

const verifyUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        jwt.verify(token, process.env.SECKEY, (error, decoded) => {
            if (error) {
                return res.status(401).json({ message: "Invalid token" });
            }

            req.data = decoded.userID;
            next();
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { verifyUser };
