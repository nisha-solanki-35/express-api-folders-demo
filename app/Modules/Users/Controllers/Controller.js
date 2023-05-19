const fs = require('fs')
const path = require('path')
const { status, jsonStatus } = require('../../../helper/ApiResponses')

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

const Register = (req, res) => {
  const registrationData = req.body
  let usersData = []
  if (fs.existsSync(path.dirname(__dirname) + '/files/Users.json')) {
    let users = fs.readFileSync(path.dirname(__dirname) + '/files/Users.json', 'utf-8')
    if (users === '') {
      console.log('registrationData', registrationData)
      const userRegistrationData = { ...registrationData, _id: Date.now().toString()} 
      usersData.push(userRegistrationData)
      fs.writeFileSync(path.dirname(__dirname) + '/files/Users.json', JSON.stringify(usersData))
      return res.status(status.OK).jsonp({ status: jsonStatus.OK, message: 'Registered successfully' })
    } else {
      const index = JSON.parse(users)?.findIndex(data => data.sUsername === registrationData.sUsername)
      if (index >= 0) {
        return res.status(status.BadRequest).jsonp({ status: jsonStatus.BadRequest, message: 'User already exist!!' })
      } else {
        usersData = [...JSON.parse(users)]
        console.log('registrationData', registrationData)
        const userRegistrationData = { ...registrationData, _id: Date.now().toString()} 
        usersData.push(userRegistrationData)
        fs.writeFileSync(path.dirname(__dirname) + '/files/Users.json', JSON.stringify(usersData))
        return res.status(status.OK).jsonp({ status: jsonStatus.OK, message: 'Registered successfully' })
      }
    }
  } else {
    const usersData = []
    console.log('registrationData', registrationData)
    const userRegistrationData = { ...registrationData, _id: Date.now().toString()} 
    usersData.push(userRegistrationData)
    fs.writeFileSync(path.dirname(__dirname) + '/files/Users.json', JSON.stringify(usersData))
    return res.status(status.OK).jsonp({ status: jsonStatus.OK, message: 'Registered successfully' })
  }
}

const Login = (req, res) => {

}

const UpdateUser = (req, res) => {
  const registrationData = req.body
  let usersData = []
  if (fs.existsSync(path.dirname(__dirname) + '/files/Users.json')) {
    let users = fs.readFileSync(path.dirname(__dirname) + '/files/Users.json', 'utf-8')
    if (users === '') {
      usersData.push(registrationData)
      fs.writeFileSync(path.dirname(__dirname) + '/files/Users.json', JSON.stringify(usersData))
      return res.status(status.OK).jsonp({ status: jsonStatus.OK, message: 'Registered successfully' })
    } else {
      const index = JSON.parse(users)?.findIndex(data => data.sUsername === registrationData.sUsername)
      if (index >= 0) {
        return res.status(status.BadRequest).jsonp({ status: jsonStatus.BadRequest, message: 'User already exist!!' })
      } else {
        usersData = [...JSON.parse(users)]
        usersData.push(registrationData)
        fs.writeFileSync(path.dirname(__dirname) + '/files/Users.json', JSON.stringify(usersData))
        return res.status(status.OK).jsonp({ status: jsonStatus.OK, message: 'Registered successfully' })
      }
    }
  } else {
    const usersData = []
    usersData.push(registrationData)
    fs.writeFileSync(path.dirname(__dirname) + '/files/Users.json', JSON.stringify(usersData))
    return res.status(status.OK).jsonp({ status: jsonStatus.OK, message: 'Registered successfully' })
  }
}

const ChangePassword = (req, res) => {

}

module.exports = { GetUserDetails, Register, Login, UpdateUser, ChangePassword }