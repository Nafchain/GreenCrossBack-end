const mongoose = require('mongoose');

const userJSONSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },

    createdDate: {
        type: Date,
        required: true
    },

    review:{
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('user', userJSONSchema);

