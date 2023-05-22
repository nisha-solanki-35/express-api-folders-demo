const { status, jsonStatus } = require("../../../helper/ApiResponses");
const { checkOneCapitalOtherLetters, check16LengthPassword, checkAllSmallLettersOneSymbol, checkOneCapitalOneSymbol16Length, isEmail, decryption, encryption } = require("../../../helper/helper");

const GetUserDetails = (req, res, next) => {
  const { iUserId } = req.params
  if (iUserId) next()
  else {
    return res.status(status.UnprocessableEntity).jsonp({ status: jsonStatus.UnprocessableEntity, error: 'User Id is required!' })
  }
}

const RegisterV1 = (req, res, next) => {
  const { sUsername, sPassword, sEmail } = req.body
  if (!checkOneCapitalOtherLetters(sUsername)) return res.status(status.BadRequest).jsonp({ status: jsonStatus.BadRequest, message: 'Username must contain one captial letter and number' })
  else if (!check16LengthPassword(sPassword)) return res.status(status.BadRequest).jsonp({ status: jsonStatus.BadRequest, message: 'Password must contain at least one capital letter, at least one small letter, at least one symbol and total length 16' })
  else if (!isEmail(sEmail)) return res.status(status.BadRequest).jsonp({ status: jsonStatus.BadRequest, message: 'Invalid email format!' })
  else next()
};

const RegisterV2 = (req, res, next) => {
  const { sUsername, sPassword, sEmail } = req.body
  if (!checkAllSmallLettersOneSymbol(sUsername)) return res.status(status.BadRequest).jsonp({ status: jsonStatus.BadRequest, message: 'Username must contain at least one symbol and other small letters' })
  else if (!checkOneCapitalOneSymbol16Length(sPassword)) return res.status(status.BadRequest).jsonp({ status: jsonStatus.BadRequest, message: 'Password must contain at least one capital letter ,at least one symbol and total length 16' })
  else if (!isEmail(sEmail)) return res.status(status.BadRequest).jsonp({ status: jsonStatus.BadRequest, message: 'Invalid email format!' })
  else next()
};

const LoginV1 = (req, res, next) => {
  const { sPassword } = req.body
  req.body.sPassword = encryption(sPassword)
  next()
};

const decrypt = function (req, res, next) {
  const { sPassword, sOldPassword, sNewPassword } = req.body
  if (sPassword) {
    req.body.sPassword = decryption(sPassword)
  } else if (sOldPassword && sNewPassword) {
    req.body.sOldPassword = decryption(sOldPassword)
    req.body.sNewPassword = decryption(sNewPassword)
  } else if (!sOldPassword && sNewPassword) {
    req.body.sNewPassword = decryption(sNewPassword)
  }
  next()
}

module.exports = { GetUserDetails, RegisterV1, RegisterV2, LoginV1, decrypt };
