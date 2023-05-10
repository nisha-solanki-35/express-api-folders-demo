const indexFile = require('../Modules/Users/index');

const routes = (app) => {
  app.use('/api/user', indexFile);
};

module.exports = routes;
