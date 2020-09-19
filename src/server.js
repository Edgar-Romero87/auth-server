'use strict';

//dependencies
const express = require('express');
const mongoose = require('mongoose');
const users = require('./auth/models/users-model');
const basicAuth = require('./auth/middleware/basic');

const app = express();
const base64 = require('base-64');

//global middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signup', async (req, res, next) =>{
  //we need to accept username and password
  //will be on the req.body
  //use the users module to create a new user
  try{
    let obj ={
      username: req.body.username,
      password: req.body.password
    }
    //create a new instance from the schema using that object
    let record = new users(obj);

    //save that instance to the database
    let newUser = await record.save();

    //once its saved, generate a token
    let token = record.generateToken();

    //Prove it - take that token and send it back to the user
    res.status(201).send(token);

  } catch (err) {
    next(err.message);
  }

})

app.post('/signin', basicAuth,(req, res, next) => {
  
  let output = {
    user: req.user,
    token: req.token
  }
  res.status(200).json(output);
 
});

app.get('/scretstuff', basicAuth, (req, res) => {
  res.send('HI');
})


//Error handler -last express route!
app.use((err, req, res, next) => {
   res.status(500).send(err)
})

// 404 not found handler
app.use('*',(req,res, next) => {
  res.status(404).send('not found');
})

module.exports = {
  app,
  start: (port) => app.listen(port, console.log('up on', port))
}