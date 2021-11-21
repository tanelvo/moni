const { Schema, model } = require('mongoose')

const transactionSchema = new Schema({
    isInc: {
        type: Boolean,
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
        type: Schema.Types.ObjectId, 
        ref: 'User', // FK
        required: true
    }
})

const Transaction = model("Transaction", transactionSchema)
module.exports = Transaction