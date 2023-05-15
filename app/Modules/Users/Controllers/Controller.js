const fs = require('fs')
const path = require('path')
const { status, jsonStatus } = require('../../../helper/ApiResponses')

const AddUser = (req, res, next) => {
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

module.exports = { AddUser }