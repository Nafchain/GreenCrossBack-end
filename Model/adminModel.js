const mongoose = require('mongoose');
const adminSchema = mongoose.Schema({

    username: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    gettoken: {
        type: Boolean,
        required: true,
    }
        
});

module.exports = mongoose.model('admin', adminSchema);