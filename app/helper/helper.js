const checkOneCapitalOtherLetters = (value) => {
  const isUsernameValid = /^[A-Z]{1}[0-9]+$/
  return !!(value.match(isUsernameValid))
}

const check16LengthPassword = (value) => {
  const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  return !!(value.match(isPasswordValid))
}

const checkAllSmallLettersOneSymbol = (value) => {
  const isUsernameValid = /^[a-z]{1,}[@$!%*?&]{1}$/
  return !!(value.match(isUsernameValid))
}

const checkOneCapitalOneSymbol16Length = (value) => {
  const isPasswordValid = /^[A-Z]+(@$!%*?&)+{16}$/
  return !!(value.match(isPasswordValid))
}

const checkAllCapitalLetters = (value) => {
  const isUsernameValid = /^[A-Z]{5,}$/
  return !!(value.match(isUsernameValid))
}

const checkAllNumbers16length = (value) => {
  const isPasswordValid = /^[0-9]{16}$/
  return !!(value.match(isPasswordValid))
}

module.exports = { checkOneCapitalOtherLetters, check16LengthPassword, checkAllSmallLettersOneSymbol, checkOneCapitalOneSymbol16Length, checkAllCapitalLetters, checkAllNumbers16length }
