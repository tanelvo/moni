const { Schema, model } = require('mongoose')

const categorySchema = new Schema({
    title: { 
      type: String,
      required: true },
    ifIncome: {
      type: Number,
      required: true
    },
    color: { 
      type: String
    },
    owner: {
      type: String, 
      ref: 'User', // FK
      required: false
  }
  });

const Category = model("Category", categorySchema)

module.exports = Category