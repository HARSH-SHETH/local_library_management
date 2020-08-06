var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookInstanceSchema = new Schema({
  book: {type: Schema.Types.ObjectId, ref: 'Book', required: true}, 
  imprint: {type: String, required: true},
  status: {type: String, required: true, enum: ['Available', 'Maintenence', 'Loaned', 'Reserved'], default: 'Maintenence'}, 
  due_back: {type: Date, default: Date.now}
});

//VIRTUAL FOR BOOK INSTANCE URL
BookInstanceSchema.virtual('url').get(function(){
  return '/Catalog/bookinstance/' + this._id;
});

//EXPORT MODEL
module.exports = mongoose.model('BookInstance', BookInstanceSchema);
