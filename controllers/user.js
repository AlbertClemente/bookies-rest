'use strict'

var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');



/*function pruebas(req, res){
        res.status(200).send({
                message: 'Probando una acción del controlador de usuarios del API REST de Bookies con Mongo y Node.js.'
        });
}*/

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
                                                        res.status(200).send({
                                                                token: jwt.createToken(user)
                                                        });
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

function updateUser(req, res){
        var userId = req.params.id;
        var update = req.body;

        User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
                if(err){
                        res.status(500).send({message: 'Error al actualizar el usuario.'}); 
                }
                else{
                        if(!userUpdated){
                                res.status(404).send({message: 'No se ha podido actualizar el usuario.'}); 
                        }
                        else{
                                res.status(200).send({user: userUpdated}); 
                        }
                }
        });
}

function uploadImgs(req, res){
        var userId = req.params.id;
        var file_name = 'Imagen no subida.';

        if(req.files){
                var file_path = req.files.image.path;
                var file_split = file_path.split('\/');
                var file_name = file_split[2];
                var extension_split = file_name.split('\.');
                var extension_name = extension_split[1];
                
                if(extension_name == 'png' || extension_name == 'jpg' || extension_name == 'gif' ){
                        User.findByIdAndUpdate(userId, {image: file_name}, (err, userUpdated) => {
                                if(err){
                                        res.status(500).send({message: 'Error al actualizar el usuario.'}); 
                                }
                                else{
                                        if(!userUpdated){
                                                res.status(404).send({message: 'No se ha podido actualizar el usuario.'}); 
                                        }
                                        else{
                                                res.status(200).send({user: userUpdated}); 
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
        var path_file = './uploads/users/' + imageFile;

        fs.exists(path_file, function(exists){
                if(exists){
                        res.sendFile(path.resolve(path_file));
                }
                else{
                        res.status(200).send({message: 'No existe el archivo.'}); 
                }
        });
}

module.exports = {
        saveUser,
        loginUser,
        updateUser,
        uploadImgs,
        getImageFile
};