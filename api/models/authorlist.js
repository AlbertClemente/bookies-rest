'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AuthorListSchema = Schema({
        titleList: String,
        descriptionList: String,
        creationDate: Date,
        user: {type: Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('AuthorList', AuthorListSchema);