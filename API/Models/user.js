const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;
let User = new Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
 password: {
    type: String,
    required: true
  },
  birthdate: {
    type: String,
    required: true
  },
  lat: {
    type: String,
  },
  lng: {
    type: String,
  },
  taxi: {
    type: Boolean,
    default: false
  },
  ride: {
    type: Boolean,
    default: false
  },
  offre: {
    type: Boolean,
    default: false
  },
  phone: {
    type: String,
    required: true
  },
  saltSecret: String
},{
    collection: 'user'
},{strict: false});
User.pre('save', function (next) {
  bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(this.password, salt, (err, hash) => {
          this.password = hash;
          this.saltSecret = salt;
          next();
      });
  });
})
User.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
User.methods.generateJwt = function () {
  return jwt.sign({ _id: this._id},
      process.env.JWT_SECRET,
  {
      expiresIn: process.env.JWT_EXP
  });
}
module.exports = mongoose.models.User || mongoose.model('User', User);