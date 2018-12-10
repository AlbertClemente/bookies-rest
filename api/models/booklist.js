'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookListSchema = Schema({
        titleList: String,
        descriptionList: String,
        creationDate: String,
        user: {type: Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('BookList', BookListSchema);