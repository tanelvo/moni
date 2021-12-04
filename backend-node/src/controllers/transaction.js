const Transaction = require('../models/Transaction')

exports.getTransactionsByID = async (req, res) => {
    const {id} = req.params;
    const transactions = await Category.find({
        category: id
    })
    if (!transactions) res.status(404).send("Categories not found")
    res.status(200).send(transactions)
}

exports.createTransaction = async (req, res) => {
    const {category, title, amount} = req.body;
    const newTransaction = {
        category,
        title,
        amount
    }

    const createdTransaction = new Transaction(newTransaction)

    const savedTransaction = await createdTransaction.save()

    res.status(200).send(`created ${savedTransaction._id}`)
}