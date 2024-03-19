const mongoose = require('mongoose');

const userJSONSchema = mongoose.Schema({
    jsonData: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    }
});

module.exports = mongoose.model('user', userJSONSchema);