const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const fs = require('fs')
const path = require('path')
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const Crypt = require('hybrid-crypto-js').Crypt
const crypt = new Crypt()

const isEmail = (value) => {
  const isEmailValid = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return !!(value.match(isEmailValid))
}

const createPasswordHash = async(password) => {
  const encryptedPassword = await bcrypt.hash(password, 10);
  return encryptedPassword
}

const generateToken = async() => {
  const userId = Date.now().toString()
  let data = {
    time: Date(),
    userId
  }
  const sToken = jwt.sign(data, jwtSecretKey);
  return { userId, sToken }
}

const encryption = function (value) {
  const PUBLIC_KEY = fs.readFileSync(path.dirname(__dirname) + '/public_key.pem', 'utf8')
  const encrypted = crypt.encrypt(PUBLIC_KEY, value)
  return encrypted.toString()
}

const decryption = function (password) {
  const PRIVATE_KEY = fs.readFileSync(path.dirname(__dirname) + '/private_key.pem', 'utf8')
  const decrypted = crypt.decrypt(PRIVATE_KEY, password)
  const decryptedData = decrypted.message
  return decryptedData.toString()
}

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

module.exports = { isEmail, createPasswordHash, generateToken, encryption, decryption, checkOneCapitalOtherLetters, check16LengthPassword, checkAllSmallLettersOneSymbol, checkOneCapitalOneSymbol16Length, checkAllCapitalLetters, checkAllNumbers16length }
