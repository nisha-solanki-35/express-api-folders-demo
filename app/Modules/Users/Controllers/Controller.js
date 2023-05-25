const fs = require('fs')
const path = require('path')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { status, jsonStatus } = require('../../../helper/ApiResponses');
const { createPasswordHash, generateToken } = require('../../../helper/helper');
const config = require('../../../../config/config');

const GetUserDetails = (req, res) => {
  const { iUserId } = req.params
  let users = fs.readFileSync(path.dirname(__dirname) + '/files/Users.json', 'utf-8')
  if (users === '') {
    return res.status(status.NotFound).jsonp({ status: jsonStatus.NotFound, message: 'User not found!' })
  } else {
    const userData = JSON.parse(users)?.find(data => data._id === iUserId)
    if (userData) {
      return res.status(status.OK).jsonp({ status: jsonStatus.OK, message: 'User data fetched successfully', data: userData })
    } else {
      return res.status(status.NotFound).jsonp({ status: jsonStatus.NotFound, message: 'User not found!' })
    }
  }
}

const Register = async (req, res) => {
  const registrationData = req.body
  let usersData = []
  if (fs.existsSync(path.dirname(__dirname) + '/files/Users.json')) {
    let users = fs.readFileSync(path.dirname(__dirname) + '/files/Users.json', 'utf-8')
    if (users === '') {
      const { userId, sToken } = await generateToken()
      const sPassword = await createPasswordHash(registrationData?.sPassword)
      const userRegistrationData = { ...registrationData, _id: userId, sPassword, sToken, sOriginalPassword: registrationData?.sPassword }
      usersData.push(userRegistrationData)
      fs.writeFileSync(path.dirname(__dirname) + '/files/Users.json', JSON.stringify(usersData))
      return res.status(status.OK).jsonp({ status: jsonStatus.OK, message: 'Registered successfully' })
    } else {
      const index = JSON.parse(users)?.findIndex(data => data?.sUsername === registrationData?.sUsername)
      if (index >= 0) {
        return res.status(status.BadRequest).jsonp({ status: jsonStatus.BadRequest, message: 'User already exist!!' })
      } else {
        usersData = [...JSON.parse(users)]
        const { userId, sToken } = await generateToken()
        const sPassword = await createPasswordHash(registrationData?.sPassword)
        const userRegistrationData = { ...registrationData, _id: userId, sPassword, sToken, sOriginalPassword: registrationData?.sPassword } 
        usersData.push(userRegistrationData)
        fs.writeFileSync(path.dirname(__dirname) + '/files/Users.json', JSON.stringify(usersData))
        return res.status(status.OK).jsonp({ status: jsonStatus.OK, message: 'Registered successfully' })
      }
    }
  } else {
    const { userId, sToken } = await generateToken()
    const sPassword = createPasswordHash(registrationData?.sPassword);
    const userRegistrationData = { ...registrationData, _id: userId, sPassword, sToken, sOriginalPassword: registrationData?.sPassword }
    usersData.push(userRegistrationData)
    fs.writeFileSync(path.dirname(__dirname) + '/files/Users.json', JSON.stringify(usersData))
    return res.status(status.OK).jsonp({ status: jsonStatus.OK, message: 'Registered successfully' })
  }
}

const Login = (req, res) => {
  const { sUsername, sPassword } = req.body
  const users = fs.readFileSync(path.dirname(__dirname) + '/files/Users.json', 'utf-8')
  const admin = JSON.parse(users)?.find(data => data.sUsername === sUsername)

  if (!admin) {
    return res.status(status.NotFound).jsonp({
      status: jsonStatus.NotFound,
      message: 'User not found!'
    })
  }

  if (!bcrypt.compareSync(sPassword, admin?.sPassword)) {
    return res.status(status.BadRequest).jsonp({
      status: jsonStatus.BadRequest,
      message: 'Authentication failed!'
    })
  }
  
  const newToken = { sToken: jwt.sign({ userId: admin._id }, config.JWT_KEY) }

  return res.status(status.OK).set('Authorization', newToken.sToken).jsonp({
    status: jsonStatus.OK,
    message: 'Login successfully',
    data: { sUsername: admin.sUsername, sEmail: admin.sEmail, _id: admin._id },
    Authorization: newToken.sToken
  })
}

const UpdateUser = (req, res) => {
  let usersData = []
  const { sUsername } = req.body
  const userData = req.user
  const users = fs.readFileSync(path.dirname(__dirname) + '/files/Users.json', 'utf-8')
  usersData = [...JSON.parse(users)]
  const userIndex = JSON.parse(users)?.findIndex(data => data._id === userData._id)
  if (userIndex < 0) return res.status(status.BadRequest).jsonp({ status: jsonStatus.BadRequest, message: 'User not found!' })

  usersData[userIndex] = {
    ...usersData[userIndex],
    sUsername
  }
  fs.writeFileSync(path.dirname(__dirname) + '/files/Users.json', JSON.stringify(usersData))
  return res.status(status.OK).jsonp({ status: jsonStatus.OK, message: 'Username updated successfully' })
}

const ChangePassword = async(req, res) => {
  let usersData = []
  const { sOldPassword, sNewPassword } = req.body
  const userData = req.user
  
  if (!bcrypt.compareSync(sOldPassword, userData?.sPassword)) {
    return res.status(status.BadRequest).jsonp({
      status: jsonStatus.BadRequest,
      message: 'Password is incorrect!'
    })
  }

  const newPassword = await createPasswordHash(sNewPassword)
  const users = fs.readFileSync(path.dirname(__dirname) + '/files/Users.json', 'utf-8')
  usersData = [...JSON.parse(users)]
  const userIndex = JSON.parse(users)?.findIndex(data => data._id === userData._id)
  console.log('userIndex', userData, userIndex)
  if (userIndex < 0) return res.status(status.BadRequest).jsonp({ status: jsonStatus.BadRequest, message: 'User not found!' })

  usersData[userIndex] = {
    ...usersData[userIndex],
    sPassword: newPassword,
    sOriginalPassword: sNewPassword
  }
  console.log('users', users)
  console.log('usersData', usersData)
  fs.writeFileSync(path.dirname(__dirname) + '/files/Users.json', JSON.stringify(usersData))
  return res.status(status.OK).jsonp({ status: jsonStatus.OK, message: 'Password was reset successfully' })
}

module.exports = { GetUserDetails, Register, Login, UpdateUser, ChangePassword }