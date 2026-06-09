const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//POST Create product
router.post('/', async (req, res) => {
    try{
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE product 
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;