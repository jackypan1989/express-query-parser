const queryParser = require('./../src/index')
const express = require('express')
const app = express()
app.use(queryParser())
app.get('/', function(req, res) {
  console.log(req.query)
  res.send('hello world');
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})