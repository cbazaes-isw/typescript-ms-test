require('dotenv').config();

const mongoose = require('mongoose');

const { MONGOBD_USR, MONGODB_PASS, MONGODB_DB } = process.env;

const uri = `mongodb+srv://${MONGOBD_USR}:${MONGODB_PASS}@cluster0.q4vemef.mongodb.net/${MONGODB_DB}?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('conectado a mongodb')) 
  .catch(e => console.log('error de conexión', e))
