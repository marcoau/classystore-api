'use strict';

const mongoose = require('mongoose');

const COLLECTION_NAME = 'products';

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    index: true,
  },
  name: {
    en: String,
    'zh-HK': String,
  },
  description: {
    en: String,
    'zh-HK': String,
  },
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
});

module.exports = mongoose.model(COLLECTION_NAME, productSchema, COLLECTION_NAME);
