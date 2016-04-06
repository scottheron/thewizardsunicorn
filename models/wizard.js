var mongoose = require('mongoose');

var WizardSchema = new mongoose.Schema({
  inventory: [],
  currentLocation: String,
  locationHistory: []
});

module.exports = mongoose.model('Wizard', WizardSchema);