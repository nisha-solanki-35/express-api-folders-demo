const route = require('express').Router();
const validator = require('./Validators/Validator');
const middleware = require('./Middlewares/Middleware');
const controller = require('./Controllers/Controller');

route.get('/user-details/:iUserId/v1', middleware.GetUserDetails, controller.GetUserDetails);
route.post('/register/user/v1', validator.checkRegisterUser, middleware.RegisterV1, controller.Register);
route.post('/register/user/v2', validator.checkRegisterUser, middleware.RegisterV2, controller.Register);
route.post('/login/user/v1', validator.checkLoginUser, middleware.encrypt, middleware.decrypt, controller.Login);
route.post('/change-password/v1', validator.checkChangePassword, middleware.ValidateUser, middleware.encrypt, middleware.decrypt, controller.ChangePassword);
route.post('/update-user/v1', validator.checkUdpateUser, middleware.ValidateUser, controller.UpdateUser);
// route.post('/login/user/v2', validator.checkUser, middleware.validateUserDataV2, controller.Login);
// route.put('/user/:userid/v1', validator.checkUser, middleware.validateUserDataV1, controller.UpdateUser);
// route.put('/user/:userid/v2', validator.checkUser, middleware.validateUserDataV2, controller.UpdateUser);
// route.put('/change-password/:userid/v2', validator.checkUser, middleware.validateUserDataV2, controller.ChangePassword);


module.exports = route;
