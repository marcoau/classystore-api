'use strict';

const mongoose = require('mongoose');
const models = require('./../models');

const Product = models.Product;

function getProducts(req, res) {
  // try parsing query
  let query = {};
  if(req.query.q) {
    try {
      query = JSON.parse(req.query.q);

    } catch(e) {}
  }

  const match = {};
  if(query.category) match.category = query.category;
  if(query.type) match.type = query.type;
  if(query.brand) match.brand = query.brand;
  if(query.variant) match.variant = query.variant;

  const project = {
    _id: 0,
    productId: 1,
    name: 1,
    description: 1,
    imageUrl: 1,
    price: 1,
    originalPrice: 1,
    category: 1,
    type: 1,
    brand: 1,
    variant: 1,
  };

  const aggregate = [
    { $match: match },
    { $limit: 20 },
    { $project: project },
  ];

  Product.aggregate(aggregate)
    .exec((err, products) => {
      if(err) return res.sendStatus(500);

      return res.send({ data: products });
    });
}

module.exports = {
  getProducts: getProducts
};
