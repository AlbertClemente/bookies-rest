'use strict'

var express = require('express');
var BookListController = require('../controllers/booklist');

var api = express.Router();
var md_auth = require('../middlewares/authenticate');

api.get('/booklist/:id', md_auth.ensureAuth, BookListController.getList);
api.get('/booklists/:page?', md_auth.ensureAuth, BookListController.getLists);
api.post('/booklist', md_auth.ensureAuth, BookListController.saveList);
api.put('/update-booklist/:id', md_auth.ensureAuth, BookListController.updateList);
api.delete('/delete-booklist/:id', md_auth.ensureAuth, BookListController.deleteList);

module.exports = api;