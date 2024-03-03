'use strict'

var token = require('jwt-simple');
var moment = require('moment');
const adminModel = require('../Routes/Model/adminModel');
var secret = 'token';

exports.createToken = function(admin){
	var payload = {
        //How declarate the variables to the admin login.
        // dni: admin.dni,
		// nombre: admin.nombre,
        // telefono: admin.telefono,
        // contrasenia: admin.contrasenia,
        // sexo: admin.sexo,
        // grupo: admin.grupo,
        // iat: moment().unix(),
        //This is for the expiration account. I think that this can be delete witout affect nothing but
        //i need search it.
		// exp: moment().add(30, 'days').unix
	};

	return token.encode(payload, secret);
};