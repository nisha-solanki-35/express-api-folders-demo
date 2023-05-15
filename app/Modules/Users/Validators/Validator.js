const { status, jsonStatus } = require("../../../helper/ApiResponses");
const { validationResult } = require('express-validator')
const { body } = require('express-validator')

const checkUserDataFields = [
  body('sUsername').not().isEmpty(),
  body('sPassword').not().isEmpty()
]

const checkUserData = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(status.UnprocessableEntity).jsonp({ status: jsonStatus.UnprocessableEntity, errors: errors.array() })
  } else {
    next()
  }
};

const checkUser = [checkUserDataFields, checkUserData]

module.exports = { checkUser };
