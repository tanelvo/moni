const router = require("express").Router()
const transactionController = require("../controllers/transaction")

router.get("/:id", transactionController.getTransactionsByID)
router.get("/user/:id", transactionController.getTransactionsByUser)
router.post("/create", transactionController.createTransaction)

module.exports = router