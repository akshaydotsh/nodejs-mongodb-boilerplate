const config = require("../../config/config");
const jwt = require('jsonwebtoken');

// JWT Token Generation method
module.exports.genJWTToken = function (userId, userRole, isRefreshToken = false, callback) {
    let expirySeconds = isRefreshToken ? config.jwt.refreshTokenTime : config.jwt.accessTokenTime;
    jwt.sign({
            role: userRole,
            _id: userId
        },
        config.jwt.key,
        {
            expiresIn: expirySeconds
        },
        callback
    )
};

// JWT verify method
module.exports.verifyJWTToken = function (token, isRefreshToken = false, callback) {
    jwt.verify(token, config.jwt.key, callback);
};
