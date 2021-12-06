const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/User')
const PORT = process.env.PORT || 3000
require("dotenv").config()
const authRoutes = require('./routes/auth')
const categoryRoutes = require('./routes/category');
const transactionRoutes = require('./routes/transaction');

const app = express()
app.use(cors())
app.use(express.json())

app.use('/', authRoutes)
app.use('/category', categoryRoutes)
app.use('/transaction', transactionRoutes)

app.post('/register2', (req, res) => {
    console.log(JSON.stringify(req.body))
    res.json(req.body)
})
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.get('/users', async (req, res) => {
    const users = await User.find()
    
    res.send(users)
})

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))
  })
  .catch((err) => {
    console.log(err)
    process.exit(1)
})