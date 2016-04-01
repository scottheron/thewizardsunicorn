var mongoose = require('mongoose');

var AdventureSchema = new mongoose.Schema({
//   manufacturer: String,
//   model: String,
//   engines: Number
});

module.exports = mongoose.model('Adventure', AdventureSchema);