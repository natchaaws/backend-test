const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

//API
require('./router/router')(app)

app.get('/', function (req, res) {
  res.send('Hello World!');
});
//port
const port = process.env.PORT || 3333
app.listen(port, function () {
  console.log(`CORS-enabled web server listening on ${port}`)
})