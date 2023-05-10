const route = require("express").Router()
const validators = require("./Validators/User.validator")

route.get("/users/v1", validators.checkUser, () => console.log('yes'))

module.exports = route