var Genre = require('../models/genre');
var Book = require('../models/book');
var async = require('async');
var validator = require('express-validator');

// Display list of all Genre.
exports.genre_list = function(req, res) {
  Genre.find().sort([['name', 'ascending']]).exec(function(err, list_genres){
    if(err) { return next(err); }
    var new_genre_list = [];
    var new_genre_list_name = [];
    list_genres.forEach(function(genre){
      if(new_genre_list_name.indexOf(genre.name) === -1){
        new_genre_list_name.push(genre.name);
        new_genre_list.push(genre);
        console.log("harsh");
      }
    });
    res.render('genre_list', { title: 'Genre List', list_genres: new_genre_list});
  });
};

// Display detail page for a specific Genre.
exports.genre_detail = function(req, res, next) {
  async.parallel({
    genre: function(callback){
      Genre.findById(req.params.id).exec(callback);
    },
    genre_books: function(callback){
      Book.find({'genre': req.params.id}).exec(callback);
    }
  }, function(err, results){
    if (err){ return next(err); }
    if(results.genre == null){
      var err = new Error('Not Found');
      err.status = 404;
      return next(err);
    }
    // SUCCESSFUL SO RENDER
    res.render('genre_detail', { title: 'Genre Detail', genre: results.genre, genre_books: results.genre_books });
  });
};

// Display Genre create form on GET.
exports.genre_create_get = function(req, res, next) {
  res.render('genre_form', { title: 'Create Genre'});
};

// Handle Genre create on POST.
exports.genre_create_post = [
  // VALIDATE NAME FIELD
  validator.body('name', 'Genre name required').trim().isLength({ min:1 }), 
  // SANITIZE THE OUTPUT
  validator.sanitizeBody('name').escape(),

  (req, res, next) => {
    // EXTRACT THE VALIDATION ERRORS
    const errors = validator.validationResult(req);

    // CREATE A GENRE OBJECT
    var genre = new Genre({ name: req.body.name });
    if( !errors.isEmpty() ){
      // THERE ARE ERRORS. RENDER THE FORM AGAIN WITH SANITIZED VALUES
      res.render('genre_form', { title: 'Create Genre', genre: genre, errors: errors.array() });
      return;
    }
    //DATA FROM FORM IS VALID
    //CHECK IF GENRE EXISTS
    Genre.findOne({ 'name': req.body.name }).exec(function(err, found_genre){
      if (err) { return next(err); }
      if (found_genre){
        res.redirect(found_genre.url);
      }else{
        genre.save(function (err){
          if (err) { return next(err); }
          // GENRE SAVED. REDIRECT TO GENRE DETAIL PAGE.
          res.redirect(genre.url);
        });
      }
    });
  }
];

// Display Genre delete form on GET.
exports.genre_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete GET');
};

// Handle Genre delete on POST.
exports.genre_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete POST');
};

// Display Genre update form on GET.
exports.genre_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update GET');
};

// Handle Genre update on POST.
exports.genre_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update POST');
};
