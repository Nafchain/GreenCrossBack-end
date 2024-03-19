'use strict'

var token = require('jwt-simple');
var moment = require('moment');
const adminModel = require('../Routes/Model/adminModel');
var secret = 'token';

exports.createToken = function(admin){
	var payload = {
        //How declarate the variables to the admin login.
        firstName: admin.dni,
		lastName: admin.nombre,
        email: admin.telefono,
        title: admin.contrasenia,
        otherTitle: admin.sexo,
        companyName: admin.grupo,
        industry: admin.contrasenia,
        otherIndustry: admin.sexo,
        companySize: admin.grupo,
        // iat: moment().unix(),
        //This is for the expiration account. I think that this can be delete witout affect nothing but
        //i need search it.
		// exp: moment().add(30, 'days').unix
	};

	return token.encode(payload, secret);
};