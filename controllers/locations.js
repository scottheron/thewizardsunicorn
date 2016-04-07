var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Location = require('../models/location');

router.route('/')
  .get(function(req, res) {
    Location.find(function(err, locations) {
      if (err) return res.status(500).send(err);
      res.send(locations);
    });
  });

module.exports = router;