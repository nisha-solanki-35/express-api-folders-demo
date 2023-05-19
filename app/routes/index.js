const { status, jsonStatus } = require('../helper/ApiResponses');
const usersIndexFile = require('../Modules/Users/index');
const tokenFile = require('../Modules/Auth/index');

const routes = (app) => {
  app.use('/api/', tokenFile)
  app.use('/api/user', [usersIndexFile]);
  app.all('/api/user/*', (req, res) => { return res.status(status.NotFound).jsonp({ status: jsonStatus.NotFound }) });
};

module.exports = routes;
