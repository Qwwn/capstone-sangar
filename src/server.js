/* eslint-disable no-unused-vars */
const express = require('express')
const app = express()
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const ClientError = require('./exceptions/ClientError')
const signInWithGoogle = require('./middleware/googleSignIn.js')

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

dotenv.config({ path: '.env.development' })
const host = process.env.HOST
const port = process.env.port

app.use(bodyParser.json())

// app.use((err, req, res, next) => {
//   if (err instanceof ClientError) {
//     return res.status(err.statusCode).json({
//       status: 'fail',
//       message: err.message
//     })
//   }
//   return res.status(500).json({
//     status: 'error',
//     message: 'Terjadi kegagalan pada server kami'
//   })
// })
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
  res.send('Hello World!')
})

app.get('/protected', authenticate, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user })
})

// app.post('/googleSignIn', async (req, res) => {
//   const idToken = req.body.idToken

//   try {
//     const user = await signInWithGoogle(idToken)
//     res.json({ success: true, user })
//   } catch (error) {
//     res.status(500).json({ success: false, error: 'Internal server error' })
//   }
// })

app.listen(port, () => {
  console.log(`App listening on http://${host}:${port}`)
})
