const cors = require('cors')
const express = require('express')
const bodyparser = require('body-parser')
const { photoRouter } = require('./controllers/photoRouter')
const app = express()

app.use(cors())
app.use(bodyparser.urlencoded({extended:false}))

app.use('/api/photos', photoRouter)

module.exports = app
