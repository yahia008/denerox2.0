const express = require("express")
const cors = require('cors');
require('dotenv').config()
const connectDB = require("./config/connect")
const router = require('./routes/greets')
const authRouter = require('./routes/auth')
const greet = require('./routes/greets')
const txRouter = require('./routes/transaction')
const bodyParser = require('body-parser');
const pinRoute = require('./routes/pin')
const profileRoute = require('./routes/profile')


const app = express()
app.use(cors());
app.use(express.json())
app.use(bodyParser.json())

connectDB()

app.use('/api', router)
app.use('/api', authRouter)
app.use('/api', txRouter)
app.use('/api', pinRoute)
app.use('/api', profileRoute)

module.exports = app