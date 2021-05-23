const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
const passport = require('passport');
const _ = require('lodash');
var config = require('../config/config');
const User = mongoose.model('User');
var jwt = require('jsonwebtoken');
var ObjectId = require('mongoose').Types.ObjectId;
const user = require('../Models/user');
const comment = require('../Models/comment');
const Comment = mongoose.model('Comment');
module.exports.register = (req, res, next) => {
  var user = new User();
  user.fullName = req.body.fullName;
  user.email = req.body.email;
  user.birthdate = req.body.birthdate;
  user.phone = req.body.phone;
  user.password = req.body.password;
  user.save((err, doc) => {
    if (!err)
      res.send(doc);
    else {
      if (err.code == 11000)
        res.status(422).send(['email']);
      else
        return next(err);
    }

  });
}

module.exports.authenticate = (req, res, next) => {
  User.findOne({
    email: req.body.email
  }, function (err, user) {
    if (err) throw err;
    if (!user) {
      res.status(401).send({ success: false, msg: 'utilisateur non trouvee.' });
    } else {
      // check if password matches
      if (user.verifyPassword(req.body.password)) {

        var token = jwt.sign(user.toJSON(), config.secret);
        // return the information including token as JSON
        return res.json({ success: true, token: 'JWT ' + token });
      } else {
        return res.status(401).send({ success: false, message: 'mot de passe incorrecte' });
      }
    }
  });
}
module.exports.updatepwd = (req, res, next) => {
  if (!ObjectId.isValid(req.body._id))
      return res.status(400).send(`aucun id trouvee : ${req.body._id}`);
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.newpassword, salt, (err, hash) => {
           let  npd = hash;
            this.saltSecret = salt;

          User.findByIdAndUpdate(req.body._id, {password : npd , saltSecret: this.saltSecret },{ new: true }, (err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log('Error in  Update :' + JSON.stringify(err, undefined, 2)); }
        });
        });
    });
  };
    module.exports.taxi = (req, res) => {
      User.find({
          taxi: true
      },{"_id":1,"lat":1, "lng":1}, function (err, user) {
          if (err) throw err;
          if (!user) {
              res.status(401).send({ success: false, msg: 'taxi unavailable.' });
          } else {
              return res.json(user);
          }
      });
  }
  module.exports.offre = (req, res) => {
    User.findByIdAndUpdate(
      req.body.id
    ,{offre:true}, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.status(401).send({ success: false, msg: 'taxi unavailable.' });
        } else {
            return res.json(user);
        }
    });
}
module.exports.deleteoffre = (req, res) => {
  User.findByIdAndUpdate(
    req.body.id
  ,{offre:false}, function (err, user) {
      if (err) throw err;
      if (!user) {
          res.status(401).send({ success: false, msg: 'taxi unavailable.' });
      } else {
          return res.json(user);
      }
  });
}
module.exports.checkoffre = (req, res) => {
  User.findOne({
    _id:ObjectId(req.body.id),
    offre:true
  }
  , function (err, user) {
      if (err) throw err;
      if (!user) {
          res.status(401).send({ success: false, msg: 'taxi unavailable.' });
      } else {
          return res.json(user);
      }
  });
}
module.exports.comment = (req, res) => {
  req.body.date= Date.now();
  var comment = new Comment({
    Comment: req.body.Comment,
    rate: req.body.rate,
    id_user: req.body.id_user,
    name_user: req.body.name_user,
    commenter_id:req.body.commenter_id,
    date:req.body.date,
  });
  comment.save()
    .then(comment => {
      res.status(200).json("reussi");
    })
    .catch(err => {
    res.status(400).send("erreur");
    console.log(err);
    });
};
module.exports.getcomment = (req, res) => {
  Comment.find({id_user : req.params.id},function (err, comment) {
    if (err) throw err;
    if (!comment) {
      res.status(401).send({ success: false, msg: 'utilisateur non trouvee.' });
    } else {
      res.json(comment);
    }
  });
};
