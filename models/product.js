'use strict';

const mongoose = require('mongoose');

const COLLECTION_NAME = 'products';

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    index: true,
  },
  name: Object,
  description: Object,
  imageUrl: String,
  originalPrice: Number,
  price: {
    type: Number,
    index: true,
  },
  category: {
    type: String,
    index: true,
  },
  type: {
    type: String,
    index: true,
  },
  brand: {
    type: String,
    index: true,
  },
  variant: String,
});

module.exports = mongoose.model(COLLECTION_NAME, productSchema, COLLECTION_NAME);
