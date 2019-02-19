const config = require('../../config/config');


exports.genSaltAndHash = (password, callback) => {
    bcrypt.genSalt(config.bcrypt.saltRounds, function (err, salt) {
        if (err) {
            callback(err)
        } else {
            bcrypt.hash(password, salt, function (err, hash) {
                if (err) {
                    callback(err)
                } else {
                    callback(null, { salt: salt, hashPassword: hash })
                }
            });
        }
    });
}

exports.comparePassword = (salt, password, hashPassword, callback) => {
  bcrypt.hash(password, salt, function (err, hash) {
      if (err) {
          callback(false)
      } else {
          if (hash === hashPassword) {
              callback(null,true)
          } else {
              callback(false)
          }
      }
  })
}
