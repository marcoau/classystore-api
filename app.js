'use strict';

const config = require('config');
const express = require('express');
const mongoose = require('mongoose');

const MONGO_URI = config.get('mongo.uri');
const MONGO_OPTIONS = config.get('mongo.options');
const PORT = 8001;

const app = express();

// TODO: remove allowance of any origin later
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Accept');

  next();
});

const router = require('./routes');
app.use(router);

mongoose.connect(MONGO_URI, MONGO_OPTIONS, err => {
  if(err) return console.error(err);
  console.log(`connected to Mongo - ${MONGO_URI}`);

  // launch express app
  app.listen(PORT);
  console.log(`ClassyStore API @ :${PORT}`);
});
