const express = require('express');
const app = express();
const _ = require('lodash');
const userRoutes = express.Router();
var config = require('../config/config');
let User = require('../models/user');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const ctrlUser = require('../controllers/user.controller');
const jwtHelper = require('../config/jwtHelper');
var myPassportService = require('../config/passportconfig')(passport);
var ObjectId = require('mongoose').Types.ObjectId;
userRoutes.post('/register', ctrlUser.register);
userRoutes.post('/authenticate', ctrlUser.authenticate);
userRoutes.post('/updatepwd', ctrlUser.updatepwd);
userRoutes.get('/taxi', ctrlUser.taxi);
userRoutes.post('/offre', ctrlUser.offre);
userRoutes.post('/checkoffre', ctrlUser.checkoffre);
userRoutes.post('/deleteoffre', ctrlUser.deleteoffre);
userRoutes.post('/comment',ctrlUser.comment);
userRoutes.get('/getcomment/:id',ctrlUser.getcomment);
module.exports = userRoutes