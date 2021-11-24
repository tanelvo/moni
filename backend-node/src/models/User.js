const { Schema, model } = require('mongoose')

const userInfoSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    initBalance: {
        type: Number
    },
    transactions: [{
        type: Schema.Types.ObjectId,
        ref: "Transaction"
    }],
    categories:[{
        type: Schema.Types.ObjectId,
        ref: "Category"
    }]
})

const User = model("User", userInfoSchema)
module.exports = User