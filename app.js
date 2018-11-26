'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//cargar rutas

//Convertir a objetos json
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//configurar cabeceras http

//rutas base

module.exports = app;