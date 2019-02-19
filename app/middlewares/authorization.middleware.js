const jwt = require('jsonwebtoken'),
    config = require('../../config/config'),
    {error} = require('../utils/responses');

    const {error} = require('../utils/responses'),
    codes = require('../utils/authCodes');

exports.isAuthorized = (code) => {
    return (req, resp, next) => {
        if (codes.hasOwnProperty(req.user.role)) {
            if (codes[req.user.role].indexOf(code) > -1) {
                next();
            } else {
                error(resp, {
                    statusCode: 401,
                    message: "Unauthorized route."
                });
            }
        } else {
            error(resp, {
                statusCode: 401,
                message: "Unauthorized route."
            })
        }
    }
};
