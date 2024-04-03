const adminModel = require("../Model/adminModel");
const bcrypt = require('bcrypt');
const token = require('../Services/token');

// Login for the admin user
async function loginUser(req, res) {
    try {
        const params = req.body;
        const name = params.firstName;
        const password = params.password;

        const user = await adminModel.findOne({ firstName: name });
		const id = user._id
		console.log('user '+user);
		// updatePassword(id, password);

        if (!user) {
            return res.status(200).send({ message: 'The user can\'t be identified' });
        }

        const check = await bcrypt.compare(password, user.password);
        if (!check) {
            return res.status(200).send({ message: 'Incorrect password. Please try again' });
        }

        if (params.gettoken) {
            // Generate and return the security token
            return res.status(200).send({ token: token.createToken(user) });
        } else {
            // Return the user data
            user.password = undefined;
            return res.status(200).send({ user });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error during login process',
            error: error.message
        });
    }
}

async function encryptPassword(password) {
    try {
        // Generar el hash de la contraseña
        const hash = await bcrypt.hash(password, 10); // El segundo argumento es el coste del hash

        // Devolver el hash generado
        return hash;
    } catch (error) {
        // Manejar errores
        console.error('Error al encriptar la contraseña:', error.message);
        return null;
    }
}

async function updatePassword(userId, newPassword) {
    try {
        // Obtener el usuario de la base de datos por su ID
        const user = await adminModel.findById(userId);

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        // Generar el hash de la nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Actualizar la contraseña en el usuario
        user.password = hashedPassword;

        // Guardar los cambios en la base de datos
        const updatedUser = await user.save();

        return updatedUser;
    } catch (error) {
        // Manejar errores
        console.error('Error al actualizar la contraseña:', error.message);
        return null;
    }
}


module.exports = { loginUser, encryptPassword, updatePassword };


// //registration in the platform
// exports.createAdmin = async (req, res) => {
// 	var params = req.body;
// 	var admin = new adminModel();
// 	let expresionregular = /^\d{8}[a-zA-Z]$/;//validate the dni
// 	var expresionRegular1 = /^([0-9]+){9}$/; //validate the telefone number
// 	var number
// 	var letr
// 	var letra

// 	if (params.name && params.dni &&
// 		params.phone && params.group && params.grender && params.password) {

// 		let dni = params.dni;

// 		if (expresionregular.test(params.dni) == true) {
// 			number = dni.substr(0, dni.length - 1);
// 			letr = dni.substr(dni.length - 1, 1);
// 			number = number % 23;
// 			letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
// 			letra = letra.substring(number, number + 1);
// 			if (letra != letr.toUpperCase()) {
// 				return res.status(200).send({
// 					message: 'The letter does not match or the numbers are wrong'
// 				});
// 			}
// 		} else {
// 			res.status(200).send({
// 				message: 'Invalid DNI format'
// 			});
// 		}


// 		if (expresionRegular1.test(params.phone)==false) {
// 			return res.status(200).send({
// 				message: 'Invalid phone number'
// 			});
// 		}

// 		admin.name = params.name;
// 		admin.dni = params.dni;
// 		admin.phone = params.phone;
// 		admin.group = params.group;
// 		admin.grender = params.grender;
// 		admin.password = params.password;

// 		//Controling the duplicate users
// 		adminModel.find({
// 			$or: [{
// 					name: admin.name.toLowerCase()
// 				},
// 				{
// 					password: admin.password.toLowerCase(),
// 					dni: admin.dni.toLowerCase()
// 				}
// 			]
// 		}).exec((err, users) => {
// 			if (err) return res.status(500).send({
// 				message: 'User request error'
// 			});

// 			if (users && users.length >= 1) {
// 				return res.status(200).send({
// 					message: 'The user you are trying to register already exists'
// 				});
// 			} else {

// 				//Encrypt the data and save the data
// 				bcrypt.hash(params.password, 10, (err, hash) => {
// 					admin.password = hash;

// 					admin.save((err, userStored) => {
// 						if (err) return res.status(500).send({
// 							message: 'Error saving user'
// 						});

// 						if (userStored) {
// 							res.status(200).send({
// 								user: userStored
// 							});
// 						} else {
// 							res.status(404).send({
// 								message: 'User has not registered'
// 							});
// 						}

// 					});
// 				});

// 			}
// 		});

// 	} else {
// 		res.status(200).send({
// 			message: 'Send all data'
// 		});
// 	}
// }
