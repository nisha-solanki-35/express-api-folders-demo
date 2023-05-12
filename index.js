const express = require('express');
require('dotenv').config();
const config = require('./config/config');

const app = express();

const routesIndex = require('./app/routes/index');

routesIndex(app);

app.listen(config.PORT, (err) => {
  if (err) console.log(err);
  console.log(`PORT listening on ${config.PORT}`);
});
