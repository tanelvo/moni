const Transaction = require('../models/Transaction')

exports.getTransactionsByID = async (req, res) => {
    const {id} = req.params;
    const transactions = await Transaction.find({
        category: id
    })
    if (!transactions) res.status(404).send("Transactions not found")
    res.status(200).send(transactions)
}

exports.getTransactionsByUser = async (req, res) => {
    const {id} = req.params;
    const transactions = await Transaction.find({
        owner: id
    })
    if (!transactions) res.status(404).send("Transactions not found")
    res.status(200).send(transactions)
}

exports.createTransaction = async (req, res) => {
    const {category, title, amount, owner, ifIncome, creationDate} = req.body;
    const newTransaction = {
        category,
        title,
        amount,
        owner,
        ifIncome,
        creationDate
    }

    const createdTransaction = new Transaction(newTransaction)
    const savedTransaction = await createdTransaction.save()

    res.status(200).send(`created ${savedTransaction._id}`)
}