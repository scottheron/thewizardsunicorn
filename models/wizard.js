var mongoose = require('mongoose');

var WizardSchema = new mongoose.Schema({
  inventory: [],
  currentLocation: String,
  locationHistory: [],
  fin: Boolean
});



module.exports = mongoose.model('Wizard', WizardSchema);