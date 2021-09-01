const http = require('http')
const app = require('./app')
const PORT = 3003

http.createServer(app).listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})