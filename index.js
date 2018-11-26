'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.port || 3977;

mongoose.connect('mongodb://localhost:27017/bookies', (err, res) => {
    if(err){
        throw err;
    }
    else{
        console.log("La conexión a la DB se ha hecho correctamente.");
        app.listen(port, function(){
            console.log("Server de la API Rest escuchando en http://localhost:" + port);
        });
    }
});