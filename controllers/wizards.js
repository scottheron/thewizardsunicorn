var express = require('express');
var Wizard = require('../models/wizard');
var router = express.Router();

router.route('/')
  .get(function(req, res) {
    Wizard.findOne(function(err, wizards) {
      if (err) return res.status(500).send(err);
      res.send(wizards);
    });
  })
  .post(function(req, res) {
    Wizard.create(req.body, function(err, wizard) {
      if (err) return res.status(500).send(err);
      res.send(wizard);
    });
  })
  .put(function(req, res){
    console.log("params");
    console.log(req.params.id);

    console.log("body");
    console.log(req.body);
      Wizard.findByIdAndUpdate(req.body.id, req.body, function(err) {
          if (err) return res.status(500).send(err);
          res.send({'message': 'success'});
      });
  });
  
  

module.exports = router;