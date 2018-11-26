'use strict'

var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');

function pruebas(req, res){
        res.status(200).send({
                message: 'Probando una acción del controlador de usuarios del API REST de Bookies con Mongo y Node.js.'
        });
}

function saveUser(req, res){
        var user = new User();
        var params = req.body;

        console.log(params);
        user.name = params.name;
        user.surname = params.surname;
        user.username = params.username;
        user.email = params.email;
        user.role = 'ROLE_ADMIN';
        user.image = 'null';

        if(params.password){
                //Encriptar contraseña
                bcrypt.hash(params.password, null, null, function(err, hash){
                        user.password = hash;
                        if(user.username != null && user.name != null && user.surname != null && user.email != null){
                                //guardar usuario
                                user.save((err, userStored) => {
                                        if(err){
                                                res.status(500).send({message: 'Error al guardar el usuario.'});
                                        }
                                        else{
                                                if(!userStored){
                                                        res.status(404).send({message: 'No se ha registrado el usuario.'});
                                                }
                                                else{
                                                        res.status(200).send({user: userStored});
                                                }
                                        }
                                });
                        }
                        else{
                                res.status(200).send({message: 'Rellena todos los campos.'});
                        }
                });
        }
        else{
                res.status(200).send({message: 'Introduce la contraseña.'});
        }
}

function loginUser(req, res){
        var params = req.body;

        var email = params.email;
        var password = params.password;

        User.findOne({email: email.toLowerCase()}, (err, user) =>{
                if(err){
                        res.status(500).send({message: 'Error en la petición.'});
                }
                else{
                        if(!user){
                                res.status(404).send({message: 'Error: el usuario no existe'});
                        }
                        else{
                                //Comprobar contraseña
                                bcrypt.compare(password, user.password, (err, check) => {
                                        if(check){
                                                //Devolver los datos del usuario logeado
                                                if(params.gethash){
                                                        //Devolver token JWT
                                                }
                                                else{
                                                        res.status(200).send({user});        
                                                }
                                        }
                                        else{
                                                res.status(404).send({message: 'Error: la contraseña es incorrecta. El usuario no ha podido logearse.'});
                                        }
                                });
                        }
                }
        });
}

module.exports = {
        pruebas,
        saveUser,
        loginUser
};