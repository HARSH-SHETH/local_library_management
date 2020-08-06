var Author = require('../models/author.js');

var authorObj = {
  // DISPLAY LIST OF ALL AUTHORS
  author_list: function(req, res){ res.send('NOT IMPLEMENTED: Author list'); }, 
  // DISPLAY DETAIL PAGE FOR A SPECIFIC AUTHOR
  author_detail: function(req, res){ res.send('NOT IMPLEMENTED: Author detail: ' + req.params.id); }, 
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
