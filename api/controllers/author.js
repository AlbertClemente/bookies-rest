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

function saveAuthor(req, res){
    var author = new Author();

    var params = req.body;
    author.name = params.name;
    author.surname = params.surname;
    author.description = params.description;
    author.image = 'null';

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

function updateAuthor(req, res){
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

function deleteAuthor(req, res){
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
                            res.status(404).send({message: 'No se ha podido borrar el libro.'}); 
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

function uploadImgAuthor(req, res){
    var authorId = req.params.id;
    var file_name = 'Imagen no subida.';

    if(req.files){
        var file_path = req.files.image.path;
        var file_split = file_path.split('\/');
        var file_name = file_split[2];
        var extension_split = file_name.split('\.');
        var extension_name = extension_split[1];
        
        if(extension_name == 'png' || extension_name == 'jpg' || extension_name == 'gif' ){
            Author.findByIdAndUpdate(authorId, {image: file_name}, (err, authorUpdated) => {
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
        else{
            res.status(200).send({message: 'Extensión del archivo no válida.'});
        }

    }
    else{
        res.status(200).send({message: 'No se ha subido ninguna imagen.'});
    }
}

function getImageFile(req, res){
    var imageFile = req.params.imageFile;
    var path_file = './uploads/authors/' + imageFile;

    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        }
        else{
            res.status(404).send({message: 'No existe el archivo.'}); 
        }
    });
}


module.exports = {
    getAuthor,
    getAuthors,
    saveAuthor,
    updateAuthor,
    deleteAuthor,
    uploadImgAuthor,
    getImageFile
};