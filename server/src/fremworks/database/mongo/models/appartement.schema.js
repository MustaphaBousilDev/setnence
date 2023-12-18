const mongoose = require("mongoose");
const validator = require("validator");
const appartementSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
    minlength: 2,
  },
  image: {
    type: String,
    default:
      "https://images.pexels.com/photos/1125136/pexels-photo-1125136.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  city: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  address: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  status: {
    type: Boolean,
    default: false,
  },
  surface: {
    type: Number,
    required: true,
    trim: true,
    minlength: 2,
  },
  rooms: {
    type: Number,
    required: true,
    trim: true,
    minlength: 2,
  },
  bedrooms: {
    type: Number,
    required: true,
    trim: true,
    minlength: 2,
  },
  parking: {
    type: Boolean,
    required: true,
    trim: true,
    minlength: 2,
  },
  garden: {
    type: Boolean,
    required: true,
    trim: true,
    minlength: 2,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
  deletedAt: {
    type: Date,
  },
});

module.exports = appartementSchema;
