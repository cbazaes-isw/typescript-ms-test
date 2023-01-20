require('dotenv').config();

const JWT = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const express = require('express');
const cors = require('cors');
const path = require('path');

const router = require('./src/routes');
const auth = require('./src/middleware/auth');

const { json, urlencoded } = express;
const app = express();
const port = process.env.PORT || 8080;

app.use(json());
app.use(urlencoded({ extended: false }));

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(router);


app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/html/index.html'));
});

app.get('/', (req, res) => {
    res.send('This is the microservice 1 and version v1.0.0')
});

app.post('/login', (req, res) => {

    const { username, password } = req.body;
    console.log({ message: `${username} is trying to login...` });

    if (username == 'admin' && password == 'admin') {
        return res.json({ token: JWT.sign({ user: username, }, JWT_SECRET) });
    }

    res.status(401).json({ message: 'Unauthorized' });
});

app.get('/super-secure-resource', auth, (req, res) => {

    res.status(200).json({ message: 'Welcome 😏👉🏻👉🏻' });

});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});