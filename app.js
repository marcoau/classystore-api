'use strict';

const config = require('config');
const express = require('express');
const mongoose = require('mongoose');

const MONGO_URI = config.get('mongo.uri');
const MONGO_OPTIONS = config.get('mongo.options');
const PORT = 8001;

const app = express();

const router = require('./routes');
app.use(router);

mongoose.connect(MONGO_URI, MONGO_OPTIONS, err => {
  if(err) return console.error(err);
  console.log(`connected to Mongo - ${MONGO_URI}`);

  // launch express app
  app.listen(PORT);
  console.log(`ClassyStore API @ :${PORT}`);
});
