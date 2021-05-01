const express = require('express')
const ejs = require("ejs")
require("dotenv").config()

const port = process.env.PORT

const app = express()

app.set("view engine", "ejs")
app.use(express.static("public"));

app.get('/', function(req, res) {
  res.render("index")
})

if (port == null || port == ""){
  port == 5000;
}
 

app.listen(port, function() {
  console.log(`Your server has started successfully!!: ${port}`)
})