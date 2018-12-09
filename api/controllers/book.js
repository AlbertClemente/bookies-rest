'use strict'

var fs = require('fs');
var path = require('path');
var Author = require('../models/author');
var Book = require('../models/book');
var mongoosePaginate = require('mongoose-pagination');

function getBook(req, res){
  var bookId = req.params.id;

  Book.findById(bookId).populate({path: 'author'}).exec((err, book) => {
    if(err){
      res.status(500).send({message: 'Error en la petición.'});
    }
    else{
      if(!book){
        res.status(404).send({message: 'No existe el libro.'});
      }
      else{
        res.status(200).send({book});
      }
    }
  }); 
}


function getBooks(req, res){
    if(req.params.page){
        var page = req.params.page;
    }
    else{
        var page = 1;
    }
    var itemsPerPage = 8;

    Book.find().sort('year').populate({path: 'author', model: 'Author'}).paginate(page, itemsPerPage, (err, books, total) => {
        if(err){
            res.status(500).send({message: 'Error en la petición.'});
        }
        else{
            if(!books){
                res.status(404).send({message: 'No hay artistas todavía.'});
            }
            else{
                res.status(200).send({
                    total_items: total,
                    books: books
                });
            }
        }
    })
}

function getBooksByAuthor(req, res){
    var authorId = req.params.author;

    if(!authorId){
        //Listar todos los libros de la bd
        var find = Book.find({}).sort('_id');
    }
    else{
        //Listar todos los libros de un mismo autor
        var find = Book.find({author: authorId}).sort('year');
    }

    find.populate({path: 'author', model: 'Author'}).exec((err, books) => {
        if(err){
            res.status(500).send({message: 'Error en la petición.'});
        }
        else{
            if(!books){
                    res.status(404).send({message: 'No hay libros todavía.'});
            }
            else{
                res.status(200).send({books}); 
            }
        }
    });
}

function saveBook(req, res){
  var book = new Book();

  var params = req.body;
  book.title = params.title;
  book.description = params.description;
  book.year = params.year;
  book.image = 'null';
  book.publisher = params.publisher;
  book.numPages = params.numPages;
  book.genre = params.genre;
  book.price = params.price;
  book.priceMember = params.priceMember;
  book.review = params.review;
  book.author = params.author;

  book.save((err, bookStored) => {
      if(err){
          res.status(500).send({message: 'Error en la petición.'});
      }
      else{
          if(!bookStored){
              res.status(404).send({message: 'No se ha podido guardar el autor.'});
          }
          else{
              res.status(200).send({book: bookStored});
          }
      }
  });
}

function updateBook(req, res){
  var bookId = req.params.id;
  var update = req.body;

  Book.findByIdAndUpdate(bookId, update, (err, bookUpdated) => {
      if(err){
          res.status(500).send({message: 'Error en la petición..'}); 
      }
      else{
          if(!bookUpdated){
              res.status(404).send({message: 'No se ha podido actualizar el libro.'}); 
          }
          else{
              res.status(200).send({book: bookUpdated}); 
          }
      }
  });
}

function deleteBook(req, res){
  var bookId = req.params.id;

  Book.findByIdAndRemove(bookId, (err, bookRemoved) => {
    if(err){
        res.status(500).send({message: 'Error en la petición.'}); 
    }
    else{
        if(!bookRemoved){
            res.status(404).send({message: 'No se ha podido borrar el libro.'}); 
        }
        else{
            res.status(200).send({book: bookRemoved});
        }
    }
  });
}

function uploadImgBook(req, res){
  var bookId = req.params.id;
  var file_name = 'Imagen no subida.';

  if(req.files){
      var file_path = req.files.image.path;
      var file_split = file_path.split('\/');
      var file_name = file_split[2];
      var extension_split = file_name.split('\.');
      var extension_name = extension_split[1];
      
      if(extension_name == 'png' || extension_name == 'jpg' || extension_name == 'gif' ){
          Book.findByIdAndUpdate(bookId, {image: file_name}, (err, bookUpdated) => {
              if(err){
                      res.status(500).send({message: 'Error al actualizar el libro.'}); 
              }
              else{
                  if(!bookUpdated){
                      res.status(404).send({message: 'No se ha podido actualizar el libro.'}); 
                  }
                  else{
                      res.status(200).send({book: bookUpdated}); 
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
    var path_file = './uploads/books/' + imageFile;

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
  getBook,
  getBooksByAuthor,
  getBooks,
  saveBook,
  updateBook,
  deleteBook,
  uploadImgBook,
  getImageFile
  
};