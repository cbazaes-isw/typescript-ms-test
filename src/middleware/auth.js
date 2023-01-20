const JWT = require('jsonwebtoken');

// const config = process.env;
const config = { JWT_SECRET: 'goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu' };

const verifyToken = (req, res, next) => {

    const token = req.headers['authorization'].replace("Bearer ", "");

    console.log(token);

    if (!token) {
        return res.status(403).json({ message: "Token required" });
    }

    try {
        const decoded = JWT.verify(token, config.JWT_SECRET)
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" })
    }

    next();

};

module.exports = verifyToken;