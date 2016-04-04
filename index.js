var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var env = process.env.NODE_ENV || 'development';

var mongoose = require('mongoose');
var Adventure = require('./models/adventure');
mongoose.connect('mongodb://localhost/adventure');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public/'));

app.get('/apikey', function (req, res) {
   res.send(process.env.VOICE_TO_TEXT_KEY); 
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});



var port = process.env.PORT || 3000;
app.listen(port, function() {
});

