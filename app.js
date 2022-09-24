const express = require('express')
const cors = require('cors')
const app = express()


app.use(cors())
app.use(express.json())

//API
require('./router/router')(app)

//port
app.listen(3333, function () {
  console.log('CORS-enabled web server listening on port 3333')
})