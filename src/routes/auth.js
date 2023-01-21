const JWT = require('jsonwebtoken');
const router = require('express').Router();

const { JWT_SECRET } = process.env;

router.post('/login', (req, res) => {
    
    const { username, password } = req.body;
    console.log({ message: `${username} is trying to login...` });

    if (username == 'admin' && password == 'admin') {
        return res.json({ token: JWT.sign({ user: username, }, JWT_SECRET) });
    }

    res.status(401).json({ message: 'Unauthorized' });

});

module.exports = router;