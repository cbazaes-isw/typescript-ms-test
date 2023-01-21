const router = require('express').Router();
const auth = require('../../src/middleware/auth');

router.get('/', auth, (req, res) => {
    message = `Hello ${req.query.name || 'World'} from get request`;
    res.json({ message });
});


router.get('/:lang', auth, (req, res) => {
    let message = '';
    switch (req.params.lang) {
        case "es":
            message = "Hola mundo!";
            break;
        case "en":
            message = "Hello world!";
            break;
        case "fr":
            message = "Bonjour monde!";
            break;
        default:
            message = "Hallo welt!";
            break;
    }
    res.json({ message });
});

router.post('/', auth, (req, res) => {
    let result = req.body.a + req.body.b;
    res.json({ result });
});

module.exports = router;