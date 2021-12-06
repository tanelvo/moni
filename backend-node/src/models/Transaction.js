const { Schema, model } = require('mongoose')

const transactionSchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category', // FK
        required: true
    },
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    owner: {
        type: String, 
        ref: 'User', // FK
        required: false
    },
    ifIncome: {
        type: Number,
        required: true
      },
    creationDate: {
        type: Date,
        required: true
      }
})

const Transaction = model("Transaction", transactionSchema)
module.exports = Transaction