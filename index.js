var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

var mongoose = require('mongoose');
var Adventure = require('./models/adventure');
mongoose.connect('mongodb://localhost/adventure');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public/'));

app.get('/*', function (req, res){
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(3000);
