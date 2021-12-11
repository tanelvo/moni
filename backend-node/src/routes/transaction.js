const router = require("express").Router()
const transactionController = require("../controllers/transaction")

router.get("/:id", transactionController.getTransactionsByID)
router.get("/user/:id", transactionController.getTransactionsByUser)
router.post("/create", transactionController.createTransaction)
router.delete("/delete/:id", transactionController.deleteTransaction)
router.delete("/deletecat/:id", transactionController.deleteTransactionsByCategory)

module.exports = router