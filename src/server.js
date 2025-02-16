/* eslint-disable no-unused-vars */
const express = require('express')
const app = express()
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')

const authRoutes = require('./routes/authRoutes.js')
const authenticate = require('./middleware/authenticate.js')
const search = require('./api/search')
const flowers = require('./api/flower')
const users = require('./api/user')
const seller = require('./api/seller')
const transaction = require('./api/transaction')
const cart = require('./api/cart')
const wishlist = require('./api/wishlist')
const catalog = require('./api/catalog')

const port = parseInt(process.env.PORT) || 8080
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

app.use(cors())
app.use(bodyParser.json())

app.use('/auth', authRoutes)
app.use('/search', search)
app.use('/flower', flowers)
app.use('/seller', seller)
app.use('/user', users)
app.use('/transaction', transaction)
app.use('/cart', cart)
app.use('/wishlist', wishlist)
app.use('/catalog', catalog)
app.get('/', (req, res) => {
  res.send('test cloud run')
})

app.get('/protected', authenticate, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user })
})
