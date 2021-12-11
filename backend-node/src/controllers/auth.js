const bcrypt = require("bcrypt")
const User = require('../models/User')
const jwt = require("jsonwebtoken")


exports.login = async (req, res) => {
  const { email, password } = JSON.parse(JSON.stringify(req.body))
  console.log(email)
  try {
    const user = await User.findOne({ email })

    if (!user) throw Error("User with this e-mail does not exist")

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw Error("Incorrect password")

    const userTemplate = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email,
      initBalance: user.initBalance
    }

    const token = jwt.sign(userTemplate, process.env.JWT_SECRET)
    if (!token) throw Error("Something critical happened 99981811")

    res.status(200).json({
      token,
      ...userTemplate
    })


  } catch (e){
    res.status(400).json({ error: e.message })
  }
}

exports.signup = async (req, res) => {

    const { firstName, lastName, email, password, initBalance } = JSON.parse(JSON.stringify(req.body))
  
    try {

      const user = await User.findOne({ email })
  
      if (user) throw Error("User with that e-mail already exists")
  
      const salt = await bcrypt.genSalt(10)
      if (!salt) throw Error("Something critical happened 483543875")
  
      const hash = await bcrypt.hash(password, salt)
      if (!hash) throw Error("Something critical happened 123172387")
  
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hash,
        initBalance
      })
  
      const savedUser = await newUser.save()
      if (!savedUser) throw Error("Error saving user")
  
      res.status(200).json({ message: "User created successfully" })
    } catch (e) {
      res.status(400).json({ error: e.message })
    }
  }

  exports.getUser = async (req, res) => {
    const {id} = req.params;
    const user = await User.find({
        _id: id
    })
    if (!user) res.status(404).send("Balance not found")
    res.status(200).send(user)
  }