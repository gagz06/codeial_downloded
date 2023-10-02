//sequalise sql alternative library
const mongoose = require('mongoose');
const env = require('./environment');
mongoose.connect(`mongodb://0.0.0.0/${env.db}`);
const db =mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to db"));

db.once('open',function(){
    console.log('Connected to db:MongoDB');
});

module.exports=db;