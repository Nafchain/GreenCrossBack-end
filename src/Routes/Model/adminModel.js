const mongoose = require('mongoose');
const adminSchema = mongoose.Schema({
    
//This is an example to how registrate an admin for registration or login page.

    // dni: {
    //     type: String,
    //     required: true,
    // },

    // telefono: {
    //     type: String,
    //     required: true,
    // },

    // contrasenia: {
    //     type: String,
    //     required: true,
    // },

    // sexo: {
    //     type: String,
    //     required: true,
    // },

    // grupo: {
    //     type: String,
    //     required: true,
    // },

    // nombre: {
    //     type: String,
    //     required: true,
    // }
});

module.exports = mongoose.model('admin', adminSchema);