const route = require('express').Router();
const validators = require('./Validators/User.validator');

route.get('/users/v1', validators.checkUser, (req, res) => res.send('yes'));

module.exports = route;
