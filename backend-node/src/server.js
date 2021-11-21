const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/User')
const PORT = process.env.PORT || 3001
require("dotenv").config()
const authRoutes = require('./routes/auth')


const app = express()

app.use(express.json())

/*app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))*/

app.use('/', authRoutes)

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