'use strict'; 

// import your libraries 
require('dotenv').config()

let mongoose = require('mongoose');
let server = require('./src/server');

// connect to database
mongoose.connect(process.envMONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
// your own dependencies

// start your server 
// create a .env file
server.start(process.env.PORT)
