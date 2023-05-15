const express = require('express');
require('dotenv').config();
const config = require('./config/config');
const bodyParser = require('body-parser')

const app = express();

const routesIndex = require('./app/routes/index');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

routesIndex(app);

app.listen(config.PORT, (err) => {
  if (err) console.log(err);
  console.log(`PORT listening on ${config.PORT}`);
});
