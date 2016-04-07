var mongoose = require('mongoose');

var LocationSchema = new mongoose.Schema({
  name: String,
  objects: []
});

module.exports = mongoose.model('Location', LocationSchema);