const mongoose = require('mongoose');
var config = require('../config/config');
const Ride = mongoose.model('Ride');
const User = mongoose.model('User');

var jwt = require('jsonwebtoken');
module.exports.add = (req, res, next) => {
    var ride = new Ride();

    ride.song = req.body.music;
    ride.smoking = req.body.smoking;
    ride.bag = req.body.bag;
    ride.lieu_dep = req.body.Ville_depart;
    ride.lieu_arr = req.body.Ville_arrivee;
    ride.cord_depart = req.body.cord_depart;
    ride.cord_arr = req.body.cord_arrivee;
    ride.id_user = req.body.id_user;
    ride.date_heur_dep = req.body.myDate;
    ride.nb_places = req.body.place;
    ride.prix = req.body.prix;

    ride.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            return next(err);
        }

    });
}

module.exports.fetchId = (req, res) => {
    Ride.findById({
        _id: req.body.id
    }, function (err, ride) {
        if (err) throw err;
        if (!ride) {
            res.status(401).send({ success: false, msg: 'ride unavailable.' });
        } else {
            return res.json(ride);
        }
    });
}

/*module.exports.fetchRecommanded = (req, res) => {
    Ride.findById({
        _id: req.body.id
    }, function (err, ride) {
        if (err) throw err;
        if (!ride) {
            res.status(401).send({ success: false, msg: 'ride unavailable.' });
        } else {
            return res.json(ride);
        }
    });
}*/



