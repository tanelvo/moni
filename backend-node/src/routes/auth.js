const router = require("express").Router()
const authController = require("../controllers/auth")
const jwtAuth = require("../middleware/jwtAuth")

router.post("/login", authController.login)
router.post("/register", authController.signup)
// router.post("/register", jwtAuth, authController.signup)

module.exports = router