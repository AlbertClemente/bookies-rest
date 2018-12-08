'use strict'

var express = require('express');
var BookController = require('../controllers/book');

var api = express.Router();
var md_auth = require('../middlewares/authenticate');

var multiPart = require('connect-multiparty');
var md_upload = multiPart({uploadDir: './uploads/books'});

api.get('/book/:id', md_auth.ensureAuth, BookController.getBook);
api.get('/books/author/:author?', md_auth.ensureAuth, BookController.getBooksByAuthor);
api.get('/books/:page?', md_auth.ensureAuth, BookController.getBooks);
api.post('/book', md_auth.ensureAuth, BookController.saveBook);
api.put('/update-book/:id', md_auth.ensureAuth, BookController.updateBook);
api.delete('/delete-book/:id', md_auth.ensureAuth, BookController.deleteBook);
api.post('/upload-image-book/:id', [md_auth.ensureAuth, md_upload], BookController.uploadImgBook);
api.get('/get-image-book/:imageFile', BookController.getImageFile)


module.exports = api;