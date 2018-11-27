'use strict'

var express = require('express');
var AuthorController = require('../controllers/author');

var api = express.Router();
var md_auth = require('../middlewares/authenticate');

var multiPart = require('connect-multiparty');
var md_upload = multiPart({uploadDir: './uploads/authors'});

api.get('/author/:id', md_auth.ensureAuth, AuthorController.getAuthor);
api.get('/authors/:page?', md_auth.ensureAuth, AuthorController.getAuthors);
api.post('/author', md_auth.ensureAuth, AuthorController.saveAuthor);
api.put('/update-author/:id', md_auth.ensureAuth, AuthorController.updateAuthor);


module.exports = api;