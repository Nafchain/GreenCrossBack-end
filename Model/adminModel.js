const mongoose = require('mongoose');
const adminSchema = mongoose.Schema({

    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    title: {
        type: String,
        required: true,
    },

    otherTitle: {
        type: String,
        required: true,
    },

    companyName: {
        type: String,
        required: true,
    },

    industry: {
        type: String,
        required: true,
    },

    otherIndustry: {
        type: String,
        required: true,
    },

    companySize: {
        type: String,
        required: true,
    }
        
});

module.exports = mongoose.model('admin', adminSchema);