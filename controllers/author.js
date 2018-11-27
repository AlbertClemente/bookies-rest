'use strict'

var fs = require('fs');
var path = require('path');
var Author = require('../models/author');
var Book = require('../models/book');
var mongoosePaginate = require('mongoose-pagination');

function getAuthor(req, res){
    var authorId = req.params.id;

    Author.findById(authorId, (err, author) => {
        if(err){
            res.status(500).send({message: 'Error en la petición.'});
        }
        else{
            if(!author){
                res.status(404).send({message: 'No existe el autor.'});
            }
            else{
                res.status(200).send({author});
            }
        }
    });    
}

function getAuthors(req, res){
    if(req.params.page){
        var page = req.params.page;
    }
    else{
        var page = 1;
    }
    var itemsPerPage = 10;

    Author.find().sort('name').paginate(page, itemsPerPage, (err, artists, total) => {
        if(err){
            res.status(500).send({message: 'Error en la petición.'});
        }
        else{
            if(!artists){
                res.status(404).send({message: 'No hay artistas.'});
            }
            else{
                res.status(200).send({
                    total_items: total,
                    artists: artists
                });
            }
        }
    })
}

function saveAuthor(req, res){
    var author = new Author();

    var params = req.body;
    author.name = params.name;
    author.surname = params.surname;
    author.description = params.description;
    author.image = 'null';

    author.save((err, authorStored) => {
        if(err){
            res.status(500).send({message: 'Error al guardar el autor.'});
        }
        else{
            if(!authorStored){
                res.status(404).send({message: 'El autor no ha sido guardado.'});
            }
            else{
                res.status(200).send({author: authorStored});
            }
        }
    });
}

function updateAuthor(req, res){
    var authorId = req.params.id;
    var update = req.body;

    Author.findByIdAndUpdate(authorId, update, (err, authorUpdated) => {
        if(err){
            res.status(500).send({message: 'Error al actualizar el autor.'}); 
        }
        else{
            if(!authorUpdated){
                res.status(404).send({message: 'No se ha podido actualizar el autor.'}); 
            }
            else{
                res.status(200).send({author: authorUpdated}); 
            }
        }
    });
}

module.exports = {
    getAuthor,
    getAuthors,
    saveAuthor,
    updateAuthor
};