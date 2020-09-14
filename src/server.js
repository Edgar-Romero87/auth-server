'use strict';

//dependencies
const express = require('express');
const users = require('../auth/models/users-model.js')
const app = express();
const base64 = require('base64');
const { response } = require('express');

//middleware
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.post('/signup', async (req, res) =>{
  //we need to accept username and password
  //will be on the req.body
  //use the users module to create a new user:
  try{
    let object ={
      username: req.body.username,
      password: req.body.password
    }
    //create a new instance from the schema using that object
    let record = new users(obj);

    //save that instance to the db
    let newUser = await record.save();
    //console.log(req.body);

    //once its saved, generate a token
    let token = record.generateToken();

    //Prove it - take that token and send it back to the user
    res.status(201).send(token);

  } catch (err) {
    next(err.message);
  }

})

app.post('/signin', (req, res) => {
  //Get username and password from user
  //It will be i the headers
  //this will bring in request headers. should be on an object with something called 'authorization: basic ___"

  try{
    let auth = req.headers.authorization;
    let encoded = authorization.split('')[1]
    let creds = base64.decode(encoded);
    let [username, password] = creds.split[":"]

    //get user instance from the model if we can
    let userRecord = await users.validateBasic(username, password);//this returns a promise

    let token = userRecord.generateToken();

    // console.log({ authorization })
    // console.log({ encoded })
    // console.log({ creds })

    // Look up the user by the username
    // compare the password sent against the password in the db
    // if it's good, send a token, if not, send an Error

    res.send('signin complete');

  } catch (err) {
    next(err.message);
  }

})

//Error handler -last express route
app.use(err, req, res, next) => {
   res.status(500).send(err)
}

app.use('*',(req,res, next) => {
  res.status(404).send('not found');
})

module.exports = {
  app.
  start: (port) => app.listen(port, console.log('up on', port))
}

