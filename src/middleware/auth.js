const JWT = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const verifyToken = (req, res, next) => {

    if (!req.headers['authorization']) {
        return res.status(403).json({ message: "Token required" });
    }

    const token = req.headers['authorization'].replace(/bearer /gi, "");

    try {
        const decoded = JWT.verify(token, JWT_SECRET)
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" })
    }

    next();

};

module.exports = verifyToken;