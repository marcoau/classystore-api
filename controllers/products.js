'use strict';

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

function getProduct(req, res) {
  const pId = req.params.pId;
  if(!pId) return res.sendStatus(403);

  const query = {
    productId: pId,
  };

  Product.findOne(query)
    .exec((err, product) => {
      if(err) return res.sendStatus(500);
      if(!product) return res.sendStatus(404);

      // TODO: use a better way to remove unwanted fields
      const productData = product.toObject();
      delete productData._id;
      delete productData.__v;

      return res.send({ data: productData });
    });
}

module.exports = {
  getProducts: getProducts,
  getProduct: getProduct,
};
