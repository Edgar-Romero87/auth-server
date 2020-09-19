'use strict'; 

// import your libraries
require('dotenv').config()
let mongoose = require('mongoose');
let server = require('./src/server');

// connect to mongo/database
mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

// start your server 
server.start(process.env.PORT)


//dependencies
//connect to mongo
//start the server