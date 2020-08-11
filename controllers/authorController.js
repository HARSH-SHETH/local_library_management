var Author = require('../models/author.js');
var Book = require('../models/book.js')
var async = require('async');
const validator = require('express-validator');

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
  author_create_get: function(req, res){ res.render('author_form', { title: 'Create Author' }); }, 
  // HANDLE AUTHOR CREATE ON POST
  author_create_post: [
    // VALIDATE FIELDS
    validator.body('first_name').isLength({min:1}).trim().withMessage('First Name Must Be Specified.')
    .isAlphanumeric().withMessage('First has non-alphanumeric characters'), 
    validator.body('family_name').isLength({min:1}).trim().withMessage('Family Name Must Be Specified')
    .isAlphanumeric().withMessage('Family has non-alphanumeric characters'), 
    validator.body('date_of_birth', 'Invalid date of birth').optional({checkFalsy:true}).isISO8601(), 
    validator.body('date_of_death', 'Invalid date of death').optional({checkFalsy:true}).isISO8601(), 
    //SANITIZE FIELDS
    validator.sanitizeBody('first_name').escape(),
    validator.sanitizeBody('family_name').escape(),
    validator.sanitizeBody('date_of_birth').toDate(),
    validator.sanitizeBody('date_of_death').toDate(),
    // PROCESS REQUEST AFTER VALIDATION AND SANITIZATION
    (req, res, next) => {
      const errors = validator.validationResult(req); // EXTRACT VALIDATION ERRORS FROM REq
      if(!errors.isEmpty()) {
        res.render('author_form', { title: 'Create Author', author: req.body, errors: errors.array() })
        return;
      }
      // CREATE AN AUTHOR OBJECT WITH SANITIZED DATA
      var author = new Author({
        first_name: req.body.first_name, 
        family_name: req.body.family_name, 
        date_of_birth: req.body.date_of_birth, 
        date_of_death: req.body.date_of_death
      });
      author.save(function(err){
        if (err) { return next(err); }
        // SUCCESSFUL SO RENDER
        res.redirect(author.url);
      });
    }
  ],
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
