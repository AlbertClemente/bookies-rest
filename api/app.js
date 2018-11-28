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
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

	next();
});


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