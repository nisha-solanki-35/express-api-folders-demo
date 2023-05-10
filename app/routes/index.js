const express = require("express");
const app = express()

const routes = () => { 
  app.use("/api/user", require("../Modules/Users/index")
)}

module.exports = routes