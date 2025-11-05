var express = require('express');
var router = express.Router();

const Product = require('../models/product')

router.get('/', async (req, res, next) => {
  // res.json(users)
  const product = await Product.find();
  res.json(product)
});

router.get('/:id', async (req, res, next) => {
  console.log(req.params.id)
  const productId = req.params.id
  const product = await Product.findById(productId)
  if (!product) return res.status(404).json({ message: 'Product not found' })
  res.json(product)
});

router.post('/', async (req, res, next) => {
  const { name, description,price,category,images } = req.body;
  if (!name || !description||!price||!category) {
    return res.status(400).json({ message: 'Invalid request' })
  }
  const newProduct= new Product(req.body)
  await newProduct.save()
  res.status(201).json(newProduct)
})

module.exports=router