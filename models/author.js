var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
  first_name: {type: String, required: true, maxlength: 100},
  family_name: {type: String, required: true, maxlength: 100},
  date_of_birth: {type: Date}, 
  date_of_death: {type: Date},
});

// VIRTUAL FOR AUTHOR'S FULL NAME
AuthorSchema.virtual('name').get(function(){
  var fullname = '';
  if(this.first_name && this.family_name){
    fullname = this.first_name + ', ' + this.family_name;
  }
  return fullname;
});

// VIRTUAL FOR AUTHOR'S LIFESPAN
AuthorSchema.virtual('lifespan').get(function(){
  return (this.date_of_birth.getYear() - this.date_of_death.getYear()).toString();
});

// VIRTUAL FOR AUTHOR'S URL 
AuthorSchema.virtual('url').get(function(){
  return "/catalog/author/" + this._id;
});

// EXPORT MODULE
module.exports = mongoose.model('Author', AuthorSchema);
