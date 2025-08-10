const Product = require('../models/Product');

// Get all products
exports.getProducts = async (req, res) => {
  const { min, max, category } = req.query;

  let query = {};

  if (min && max) {
    query.price = { $gte: Number(min), $lte: Number(max) };
  }

  if (category) {
    query.category = category;
  }

  const products = await Product.find(query);
  res.json(products);
};

// Add new product
exports.createProduct = async (req, res) => {
  const { title, price, image, description, category } = req.body;
  const product = new Product({ title, price, image, description, category });
  await product.save();
  res.json(product);
};