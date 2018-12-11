'use strict'

var fs = require('fs');
var path = require('path');
var BookList = require('../models/booklist');
var User = require('../models/user');
var mongoosePaginate = require('mongoose-pagination');

function getList(req, res){
    var bookListId = req.params.id;
  
    BookList.findById(bookListId).populate({path: 'user'}).exec((err, bookList) => {
      if(err){
        res.status(500).send({message: 'Error en la petición.'});
      }
      else{
        if(!bookList){
          res.status(404).send({message: 'No existe el libro.'});
        }
        else{
          res.status(200).send({bookList});
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

    BookList.find().sort('_id').populate({path: 'user', model: 'User'}).paginate(page, itemsPerPage, (err, bookLists, total) => {
        if(err){
            res.status(500).send({message: 'Error en la petición.'});
        }
        else{
            if(!bookLists){
                res.status(404).send({message: 'No hay listas todavía.'});
            }
            else{
                res.status(200).send({
                    total_items: total,
                    bookLists: bookLists
                });
            }
        }
    })
}


function saveList(req, res){
    var bookList = new BookList();

    var params = req.body;
    bookList.titleList = params.titleList;
    bookList.descriptionList = params.descriptionList;
    bookList.creationDate = params.creationDate;
    bookList.user = params.user;

    bookList.save((err, bookListStored) => {
        if(err){
            res.status(500).send({message: 'Error en la petición.'});
        }
        else{
            if(!bookListStored){
                res.status(404).send({message: 'No se ha podido guardar la lista.'});
            }
            else{
                res.status(200).send({bookList: bookListStored});
            }
        }
    });
}

function updateList(req, res){
    var bookListId = req.params.id;
    var update = req.body;

    BookList.findByIdAndUpdate(bookListId, update, (err, bookListUpdated) => {
        if(err){
            res.status(500).send({message: 'Error en la petición..'}); 
        }
        else{
            if(!bookListUpdated){
                res.status(404).send({message: 'No se ha podido actualizar la lista.'}); 
            }
            else{
                res.status(200).send({bookList: bookListUpdated}); 
            }
        }
    });
}

function deleteList(req, res){
    var bookListId = req.params.id;

    BookList.findByIdAndRemove(bookListId, (err, bookListRemoved) => {
        if(err){
            res.status(500).send({message: 'Error en la petición.'}); 
        }
        else{
            if(!bookListRemoved){
                res.status(404).send({message: 'No se ha podido borrar la lista de libros.'}); 
            }
            else{
                BookList.find({user: userRemoved._id}).remove((err, bookList) => {
                    if(err){
                        res.status(500).send({message: 'Error en la petición.'}); 
                    }
                    else{
                        if(!bookList){
                            res.status(404).send({message: 'No se ha podido borrar la lista de libros.'}); 
                        }
                        else{
                            res.status(200).send({user: userRemoved});
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