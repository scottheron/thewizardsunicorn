var express = require('express');
var User = require('../models/user');
var Wizard = require('../models/wizard');
var router = express.Router();

router.route('/')
  .get(function(req, res) {
    var currentUserId = req.user._doc._id;
    User.find(function(err, user) { 
      if (err) return res.status(500).send(err);
      res.send(user);
    });
  })
  .post(function(req, res) {
    
    User.findOne({ email: req.body.email }, function(err, user){
        if (user == null) {
            User.create(req.body, function(err, user) {
            if (err) return res.status(500).send(err);
                res.send(user);
            });
            Wizard.create({
                    currentLocation: "lair",
                    fin: true,
                    inventory: ["staff"] ,
                    locationHistory:["lair"]
            }, function(err, user) {
            if (err) return res.status(500).send(err);
                res.send(wizard);
            });
            
        } else {
            res.redirect('/login');
        }
    });
   
  });

router.get('/:id', function(req, res) {
    
  User.findById(req.params.id, function(err, user) {
    if (err) return res.status(500).send(err);
    res.send(user);
  });
});

module.exports = router;
