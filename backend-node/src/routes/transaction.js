const router = require("express").Router()
const transactionController = require("../controllers/transaction")
router.get("/transaction/:id", transactionController.getTransactionsByID)
router.get("/transaction/create", transactionController.createTransaction)

module.exports = router