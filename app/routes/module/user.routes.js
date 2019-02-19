const { isAuthenticated } = require('../../middlewares/authentication.middleware'),
      { isAuthorized } = require('../../middlewares/authorization.middleware'),
      UserController = require('../../controllers/module/user.controller');

module.exports = function(app) {
    // normal route
    app.route('/api/normal').get(UserController.unprotectedRoute)

    // protected route
    app.route('/api/protected').get(isAuthenticated, isAuthorized('code1'), UserController.protectedRoute)
}
