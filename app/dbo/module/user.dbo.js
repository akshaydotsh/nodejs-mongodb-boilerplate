const mongoose = require('mongoose'),
    User = mongoose.model('User');
   
exports.findOne = function (query, projection = {}, callback) {
    User.findOne(query, projection, callback);
};

exports.findAll = function (query, projection = {}, callback) {
    User.find(query, projection, callback);
};

exports.saveUser = function(user, callback) {
    let newUser = new User(user);
    newUser.save(callback);
};

/***
 * ADD AS MANY AS YOU LIKE... GO ON
 */
    