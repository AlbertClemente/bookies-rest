'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = Schema({
        title: String,
        description: String,
        year: Number,
        image: String,
        publisher: String,
        numPages: Number,
        genre: String,
        price: Number,
        priceMember: Number,
        review: Number,
        author: {type: Schema.ObjectId, ref: 'Author'}
});

module.exports = mongoose.model('Book', BookSchema);