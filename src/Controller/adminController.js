const adminModel = require("../Routes/Model/adminModel");
var bcrypt = require('bcrypt');
var token = require('../Services/token');


//Login for the admin user
exports.loginUser = async (req, res) => {
	var params = req.body;

	var name = params.name;
	var password = params.password;

	adminModel.findOne({
		name: name
	}, (err, user) => {
		if (err) return res.status(500).send({
			message: 'request error'
		});

		if (user) {
			bcrypt.compare(password, user.password, (err, check) => {
				if (check) {
					if (params.gettoken) {
						//generate and return the security token
						return res.status(200).send({
							token: token.createToken(user)
						});
					} else {
						//return the user data
						user.password = undefined;
						return res.status(200).send({
							user
						});
					}

				} else {
					return res.status(200).send({
						message: 'Incorrect password. Please try again'
					});
				}
			});
		} else {
			return res.status(200).send({
				message: 'The user can\'t be identify'
			});
		}
	});
}

//registration in the platform
exports.createAdmin = async (req, res) => {
	var params = req.body;
	var admin = new adminModel();
	let expresionregular = /^\d{8}[a-zA-Z]$/;//validate the dni
	var expresionRegular1 = /^([0-9]+){9}$/; //validate the telefone number
	var number
	var letr
	var letra

	if (params.name && params.dni &&
		params.phone && params.group && params.grender && params.password) {

		let dni = params.dni;

		if (expresionregular.test(params.dni) == true) {
			number = dni.substr(0, dni.length - 1);
			letr = dni.substr(dni.length - 1, 1);
			number = number % 23;
			letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
			letra = letra.substring(number, number + 1);
			if (letra != letr.toUpperCase()) {
				return res.status(200).send({
					message: 'The letter does not match or the numbers are wrong'
				});
			}
		} else {
			res.status(200).send({
				message: 'Invalid DNI format'
			});
		}


		if (expresionRegular1.test(params.phone)==false) {
			return res.status(200).send({
				message: 'Invalid phone number'
			});
		}

		admin.name = params.name;
		admin.dni = params.dni;
		admin.phone = params.phone;
		admin.group = params.group;
		admin.grender = params.grender;
		admin.password = params.password;

		//Controling the duplicate users
		adminModel.find({
			$or: [{
					name: admin.name.toLowerCase()
				},
				{
					password: admin.password.toLowerCase(),
					dni: admin.dni.toLowerCase()
				}
			]
		}).exec((err, users) => {
			if (err) return res.status(500).send({
				message: 'User request error'
			});

			if (users && users.length >= 1) {
				return res.status(200).send({
					message: 'The user you are trying to register already exists'
				});
			} else {

				//Encrypt the data and save the data
				bcrypt.hash(params.password, 10, (err, hash) => {
					admin.password = hash;

					admin.save((err, userStored) => {
						if (err) return res.status(500).send({
							message: 'Error saving user'
						});

						if (userStored) {
							res.status(200).send({
								user: userStored
							});
						} else {
							res.status(404).send({
								message: 'User has not registered'
							});
						}

					});
				});

			}
		});

	} else {
		res.status(200).send({
			message: 'Send all data'
		});
	}
}