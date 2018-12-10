'use strict'

var fs = require('fs');
var path = require('path');
var BookList = require('../models/booklist');
var Book = require('../models/book');
var mongoosePaginate = require('mongoose-pagination');

function getList(req, res){
    var bookListId = req.params.id;

    BookList.findById(bookListId, (err, author) => {
        if(err){
            res.status(500).send({message: 'Error en la petición.'});
        }
        else{
            if(!author){
                res.status(404).send({message: 'No existe la lista.'});
            }
            else{
                res.status(200).send({author});
            }
        }
    });    
}

function getLists(req, res){
    if(req.params.page){
        var page = req.params.page;
    }
    else{
        var page = 1;
    }
    var itemsPerPage = 8;

    Author.find().sort('name').paginate(page, itemsPerPage, (err, authors, total) => {
        if(err){
            res.status(500).send({message: 'Error en la petición.'});
        }
        else{
            if(!authors){
                res.status(404).send({message: 'No hay artistas todavía.'});
            }
            else{
                res.status(200).send({
                    total_items: total,
                    authors: authors
                });
            }
        }
    })
}


function saveList(req, res){
    var list = new Author();

    var params = req.body;
    author.name = params.name;
    author.surname = params.surname;
    author.description = params.description;

    author.save((err, authorStored) => {
        if(err){
            res.status(500).send({message: 'Error en la petición.'});
        }
        else{
            if(!authorStored){
                res.status(404).send({message: 'No se ha podido guardar el autor.'});
            }
            else{
                res.status(200).send({author: authorStored});
            }
        }
    });
}

function updateList(req, res){
    var authorId = req.params.id;
    var update = req.body;

    Author.findByIdAndUpdate(authorId, update, (err, authorUpdated) => {
        if(err){
            res.status(500).send({message: 'Error en la petición..'}); 
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

function deleteList(req, res){
    var authorId = req.params.id;

    Author.findByIdAndRemove(authorId, (err, authorRemoved) => {
        if(err){
            res.status(500).send({message: 'Error en la petición.'}); 
        }
        else{
            if(!authorRemoved){
                res.status(404).send({message: 'No se ha podido borrar el autor.'}); 
            }
            else{
                Book.find({author: authorRemoved._id}).remove((err, bookRemoved) => {
                    if(err){
                        res.status(500).send({message: 'Error en la petición.'}); 
                    }
                    else{
                        if(!bookRemoved){
                            res.status(404).send({message: 'No se ha podido borrar el autor.'}); 
                        }
                        else{
                            res.status(200).send({author: authorRemoved});
                        }
                    }
                });
            }
        }
    });
}


module.exports = {
    getList,
    getLists,
    saveList,
    updateList,
    deleteList
};