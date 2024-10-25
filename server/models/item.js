const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  category: {
    type: String,
    required: [true, 'Please add a category']
  },
  city: {
    type: String,
    required: [true, 'Please add a city']
  },
  image: {
    type: String,
    default: ''
  },
  contact_number: {
    type: String,
    required: [true, 'Please add a contact number']
  },
  status: {
    type: String,
    enum: ['available', 'recycled'],
    default: 'available'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Item', itemSchema);