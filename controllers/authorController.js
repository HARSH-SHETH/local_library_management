var Author = require('../models/author.js');
var Book = require('../models/book.js')
var async = require('async');

var authorObj = {
  // DISPLAY LIST OF ALL AUTHORS
  author_list: function(req, res, next){
    Author.find().populate('author').sort([['family_name', 'ascending']]).exec(function(err, list_authors){
      if(err) return next(err);
      res.render('author_list', { title: 'Author List', author_list: list_authors });
    });
  }, 
  // DISPLAY DETAIL PAGE FOR A SPECIFIC AUTHOR
  author_detail: function(req, res, next){ 
    async.parallel({
      author: function(callback){
        Author.findById(req.params.id).exec(callback);
      }, 
      authors_books: function(callback){
        Book.find({'author': req.params.id}, 'title summary').exec(callback);
      },

    }, function(err, results){
      if (err) { return next(err); }  // ERROR IN API USAGE
      if (results.author == null) { 
        var err = new Error('Author not found');
        err.status = 404;
        return next(err);
      }
    // SUCCESSFUL SO RENDER
   res.render('author_detail', { title: 'Author Detail', author: results.author, author_books: results.authors_books });
    });
  }, 
  // DISPLAY AUTHOR CREATE FORM ON GET
  author_create_get: function(req, res){ res.send('NOT IMPLEMENTED: Author create GET'); }, 
  // HANDLE AUTHOR CREATE ON POST
  author_create_post: function(req, res){ res.send('NOT IMPLEMENTED: Author create POST'); },
  // DISPLAY AUTHOR DELETE FORM ON GET
  author_delete_get: function(req, res){ res.send('NOT IMPLEMENTED: Author delete GET'); }, 
  // HANDLE AUTHOR DELETE ON POST
  author_delete_post: function(req, res){ res.send('NOT IMPLEMENTED: Author delete POST'); }, 
  // DISPLAY AUTHOR UPDATE FORM ON GET
  author_update_get: function(req, res){ res.send('NOT IMPLEMENTED: Author update GET'); }, 
  // HANDLE AUTHOR UPDATE ON POST
  author_update_post: function(req, res){ res.send('NOT IMPLEMENTED: Author update POST'); }
}

module.exports = authorObj;
