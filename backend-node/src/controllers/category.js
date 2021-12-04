const Category = require('../models/Category')

exports.getCategories = async (req, res) => {
    const categories = await Category.find({})
    res.status(200).send(categories)
}
exports.getCategoriesByID = async (req, res) => {
    const {id} = req.params;
    const categories = await Category.find({
        owner: id
    })
    if (!categories) res.status(404).send("Categories not found")
    res.status(200).send(categories)
}

exports.createCategory = async (req, res) => {
    const {title, ifIncome, color, owner} = req.body;
    const newCategory = {
        title,
        ifIncome,
        color,
        owner
    }

    const createdCategory = new Category(newCategory)

    const savedCategory = await createdCategory.save()

    res.status(200).send(`created ${savedCategory._id}`)
}

exports.updateCategory = async (req, res) => {
    const {id} = req.params;
    const category = await Category.findOne({_id: id});

    if (!category) res.status(404).send("Category ID not found")
    const updated = await Category.findOneAndUpdate({_id: id, }, req.body, {new: true})
    res.status(200).send(`Successfullyy updated. \n BEFORE:\n ${category}\n AFTER:\n ${updated}`)
}

exports.deleteCategory = async (req, res) => {
    const { id } = req.params;
  
    const category = await Category.findOneAndDelete({ _id: id })
  
    if (!category) res.status(404).send("No category with that id found")
  
    res.status(200).send(`Successfully deleted the following category: \n ${category}`)
  }