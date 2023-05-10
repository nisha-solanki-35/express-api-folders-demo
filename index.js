const express = require("express");
require('dotenv').config()
const config = require("./config/config");
const app = express()

require("./app/routes/index")

app.listen(config.PORT, (err, res) => {
	if (err) console.log(err);
	console.log(`PORT listening on ${config.PORT}`);
})