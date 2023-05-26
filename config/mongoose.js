const mongoose = require('mongoose');
mongoose.connect('mongodb://0.0.0.0/codeial_development');
const db =mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to db"));

db.once('open',function(){
    console.log('Connected to db:MongoDB');
});

module.exports=db;