const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const roles = ['user', 'admin'];

const UserSchema = mongoose.Schema({
  email: {
      type: String,
      match: /^\S+@\S+\.\S+$/,
      required: false,
      trim: true,
      lowercase: true
  },
  password: {
      type: String,
      required: true,
      minlength: 6
  },
  username: {
      type: String,
      required: false
  },
  name: {
      type: String,
      index: true,
      trim: true,
      required: true
  },
  role: {
      type: String,
      enum: roles,
      default: 'user'
  },
});


// before saving convert password to hash
UserSchema.pre("save", function saveHook(next) {
  let user = this;

  // proceed further only if the password is modified or the user is new
  if (!user.isModified('password')) return next();

  return bcrypt.genSalt(function (saltError, salt) {
      if (saltError) {
          return next(saltError);
      }
      return bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
              return next(hashError);
          }
          // replace a password string with hash value
          user.password = hash;
          user.salt = salt;
          return next();
      });
  });
});

// If password is getting updated
UserSchema.pre('update', function (next) {
  let updates = this;
  if (Object.keys(updates).indexOf('password') !== -1) {
      bcrypt.genSalt(function (saltError, salt) {
          if (saltError) {
              return next(saltError);
          }
          return bcrypt.hash(updates.password, salt, function (hashError, hash) {
              if (hashError) {
                  return next(hashError);
              }
              // replace a password string with hash value
              updates.password = hash;
              updates.salt = salt;
              return next();
          });
      })
  } else {
      return next();
  }
});

UserSchema.methods = {
  comparePassword(salt, password, hashPassword) {
      return bcrypt.hash(password, salt, function (err, res) {
          if (err) {
              return false
          } else {
              return res === hashPassword
          }
      })
  }
};


module.exports = mongoose.model('User', UserSchema);

