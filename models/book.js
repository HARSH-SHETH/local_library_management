var mongoose = require('mongoose');

var Schema = mongoose.Scehma;

var BookSchema = new Schema({
  title: {type: String, required: true}, 
  author: {type: Schema.Types.ObjectId, ref: 'Author', required: true}, 
  summary: {type: String, required: true}, 
  genre: [{type: Schema.Types.ObjectId, ref: 'Genre'}]
});

// VIRTUAL FOR BOOK'S URL
BookSchema.virtual('url').get(function(){
  return '/catalog/book/' + this._id;
});

module.exports = mongoose.model('Book', BookSchema);