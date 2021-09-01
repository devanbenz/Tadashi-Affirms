const cors = require('cors')
const express = require('express')
const { photoRouter } = require('./controllers/photoRouter')
const app = express()

app.use(cors())

app.use('/api/photos', photoRouter)

module.exports = app
