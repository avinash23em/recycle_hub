const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// Get all items (for vendor to view)
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new item (for user to list item)
router.post('/', async (req, res) => {
  try {
    const newItem = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      city: req.body.city,
      contact_number: req.body.contact_number,
      image: req.body.image || '',
      userId: req.body.userId
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;