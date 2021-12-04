const router = require("express").Router()
const categoryController = require("../controllers/category")

router.get("/", categoryController.getCategories)
router.get("/user/:id", categoryController.getCategoriesByID)
router.post("/create", categoryController.createCategory)
router.put("/update/:id", categoryController.updateCategory)
router.delete("/delete/:id", categoryController.deleteCategory)

module.exports = router