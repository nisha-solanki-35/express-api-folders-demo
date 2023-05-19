const route = require('express').Router();
const jwt = require('jsonwebtoken');
const fs = require('fs')
const path = require('path')
const { status, jsonStatus } = require('../../helper/ApiResponses');

route.post("/user/generateToken", (req, res) => {
  const { userId } = req.body
  console.log('userId', userId)
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let data = {
      time: Date(),
      userId
  }
  const token = jwt.sign(data, jwtSecretKey);
  let users = fs.readFileSync(path.dirname(__dirname) + '/Users/files/Users.json', 'utf-8')
  if (users) {
    const index = JSON.parse(users)?.findIndex(data => data?._id === userId)
    if (index < 0) {
      return res.status(status.BadRequest).jsonp({ status: jsonStatus.BadRequest, message: 'User not found!!' })
    } else {
      let usersData = [...JSON.parse(users)]
      usersData[index] = { ...usersData[index], token }
      fs.writeFileSync(path.dirname(__dirname) + '/Users/files/Users.json', JSON.stringify(usersData))
      return res.status(status.OK).jsonp({ status: jsonStatus.OK, message: 'Token generated successfully' })
    }
  } else {
    return res.status(status.BadRequest).jsonp({ status: jsonStatus.BadRequest, message: 'User not found!!' })
  }
});

module.exports = route;
