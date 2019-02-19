const config = require('../../../config/config'),
      {success200} = require('../../utils/responses');


exports.unprotectedRoute = (req, resp) => {
    success200(resp, {
      success: true,
      message: "Unprotected route is working"
    });
}


exports.protectedRoute = (req, resp) => {
    success200(resp, {
      success: true,
      message: "Protected route is working"
    });
}

