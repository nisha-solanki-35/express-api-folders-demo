const { status, jsonStatus, checkOneCapitalOtherLetters, check16LengthPassword } = require("../../../helper/ApiResponses");

const validateUserData = (req, res, next) => {
  const { sUsername, sPassword } = req.body
  if (!checkOneCapitalOtherLetters(sUsername)) return res.status(status.BadRequest).jsonp({ status: jsonStatus.BadRequest, message: 'Username must contain one captial letter and number' })
  else if (!check16LengthPassword(sPassword)) return res.status(status.BadRequest).jsonp({ status: jsonStatus.BadRequest, message: 'Password must contain at least one capital letter, at least one small letter, at least one symbol and total length 16' })
  else next()
};

module.exports = { validateUserData };
