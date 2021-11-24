const { Schema, model } = require('mongoose')

const categorySchema = new Schema({
    title: { 
      type: String,
      required: true },
    ifIncome: {
      type: Boolean,
      required: true
    },
    color: { 
      type: String
    },
    owner: {
      type: Schema.Types.ObjectId, 
      ref: 'User', // FK
      required: false
  }
  });

const Category = model("Category", categorySchema)

module.exports = Category