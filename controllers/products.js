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

  const aggregate = [
    { $match: match },
    { $limit: 20 }
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
