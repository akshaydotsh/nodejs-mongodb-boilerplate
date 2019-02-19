const jwt = require('jsonwebtoken'),
    config = require('../../config/config'),
    {error} = require('../utils/responses');


exports.isAuthenticated = (req, resp, next) => {
  let token = null;
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      token = req.headers.authorization.split(' ')[1];
  }
  if (token === null) {
      error(resp, {
          statusCode: 401,
          message: "Unauthorized. Token missing."
      })
  } else {
      jwt.verify(token, config.jwt.key, (err, data) => {
          if (err || !data) {
              error(resp, {
                  statusCode: 401,
                  message: err || "Unauthorized",
              });
          } else {
              req.user = data;
              next();
          }
      })
  }
};
