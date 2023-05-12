const usersIndexFile = require('../Modules/Users/index');

const routes = (app) => {
  app.use('/api/user', usersIndexFile);
};

module.exports = routes;
