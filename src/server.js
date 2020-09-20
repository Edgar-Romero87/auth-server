'use strict';

//dependencies
const express = require('express');
const base64 = require('base-64');
const users = require('./auth/models/users-model');
const basicAuth = require('./auth/middleware/basic');
const authRouter = require('./auth/router');
const testRoutes = require('../test-routes');

const app = express();

//global middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authRouter);
app.use(testRoutes);


// 404 not found handler
app.use('*',(req,res, next) => {
  res.status(404).send('not found');
})

app.get('/secretstuff', basicAuth, (req, res) => {
  res.send('HI')
})

module.exports = {
  app,
  start: (port) => app.listen(port, console.log('up on', port))
}