const route = require('express').Router();
const validator = require('./Validators/Validator');
const middleware = require('./Middlewares/Middleware');
const controller = require('./Controllers/Controller');

route.post('/users/v1', validator.checkUser, middleware.validateUserData, controller.AddUser);

module.exports = route;
