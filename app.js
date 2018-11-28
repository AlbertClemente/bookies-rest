'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//cargar rutas
var user_routes = require('./routes/user');
var author_routes = require('./routes/author');
var book_routes = require('./routes/book');

//Convertir a objetos json
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//configurar cabeceras http

//rutas base
app.use('/api', user_routes);
app.use('/api', author_routes);
app.use('/api', book_routes);

/*
app.get('/pruebas', function(req, res){
        res.status(200).send({message: 'Bienvenido a la API de Bookies.'});
});
*/

module.exports = app;