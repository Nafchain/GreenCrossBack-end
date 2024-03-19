const mongoose = require('mongoose');

const userJSONSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    }
});

module.exports = mongoose.model('user', userJSONSchema);

