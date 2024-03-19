const mongoose = require('mongoose');
const firebaseSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
    }
        
});

module.exports = mongoose.model('firebase', firebaseSchema);