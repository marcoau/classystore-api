'use strict';

const express = require('express');
const router = express.Router();

const controllers = require('./../controllers');

router.get('/', controllers.products.getProducts);
router.get('/:pId', controllers.products.getProduct);

module.exports = router;
