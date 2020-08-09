var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var genreSchema = new Schema({
  name: {type: String, required: true, maxlength: 100, minlength: 3}
});

genreSchema.virtual('url').get(function(){
  return '/Catalog/genre/' + this._id;
});

// EXPORT MODULE
module.exports = mongoose.model('Genre', genreSchema);
