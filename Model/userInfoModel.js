const mongoose = require('mongoose');

const userJSONSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },

    createdDate: {
        type: Date,
        required: false
    },

    review:{
        type: Boolean,
        required: false
    }
});

module.exports = mongoose.model('user', userJSONSchema);

