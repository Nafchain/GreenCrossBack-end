var token = require('jwt-simple');
var moment = require('moment');
var secret = 'token';

exports.createToken = function(admin){
	var payload = {
        //How declarate the variables to the admin login.
        username: admin.username,
        password: admin.password,
        iat: moment().unix()
	};

	return token.encode(payload, secret);
};