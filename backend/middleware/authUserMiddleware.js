const jwt = require("jsonwebtoken");
require("dotenv").config()
const authMiddleWare = async (req, res, next) =>
{
    const authToken = req.header("Authorization")
    
    if (!authToken || !authToken.startsWith("Bearer ")) {
        res.status(401).json({
            messsage:"No token found"
        })
    }
    const token = authToken.split(" ")[1]
    try {
        const verifyToken = jwt.verify(token, process.env.JWTSECRET)
        if (verifyToken) {
            req.user = verifyToken
            next()
        }
    } catch (e) {
        res.status(500).json({
            message:e.message
        })
    }
}
module.exports = {authMiddleWare}