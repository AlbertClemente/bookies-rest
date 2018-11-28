'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_bookies';

exports.createToken = function(user){
  var payload = {
    sub: user._id,
    name: user.name,
    surname: user.surname,
    username: user.username,
    email: user.email,
    role: user.role,
    image: user.image,
    iat: moment().unix(), //fecha timestamp
    exp: moment().add(30, 'days').unix //expira en 30 dias
  };
  return jwt.encode(payload, secret);
};