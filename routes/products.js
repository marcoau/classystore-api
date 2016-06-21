'use strict';

const express = require('express');
const router = express.Router();

const controllers = require('./../controllers');

router.get('/', controllers.products.getProducts);

module.exports = router;
