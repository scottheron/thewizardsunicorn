var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var app = express();
var request = require('request');
var env = process.env.NODE_ENV || 'development';
var secret = "mysupersecretpassword";
var mongoose = require('mongoose');

var User = require('./models/user');
var Wizard = require('./models/wizard');
var Location = require('./models/location');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public/'));
app.use('/api/users', expressJWT({secret: secret}).unless({
    method: "POST"
}));
//app.use('/adventure', expressJWT({secret: secret}));

mongoose.connect( process.env.MONGOLAB_URI || 'mongodb://localhost/adventure');

app.use('/api/locations', require('./controllers/locations'));
app.use('/api/wizards', require('./controllers/wizards'));

app.use('/api/adventure', require('./controllers/adventure'));
app.use('/api/users', require('./controllers/users'));

app.post('/api/auth', function(req, res) {
  User.findOne({email: req.body.email}, function(err, user) {
    if (err || !user) return res.status(401).send({message: 'User not found'});
    user.authenticated(req.body.password, function(err, result) {
      if (err || !result) return res.status(401).send({message: 'User not authenticated'});

      var token = jwt.sign(user, secret);
      res.send({user: user, token: token});
    });
  });
});

app.get('/apikey', function (req, res) {
   res.send(process.env.VOICE_TO_TEXT_KEY); 
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
});

