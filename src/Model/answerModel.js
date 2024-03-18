const mongoose = require('mongoose');
const answerSchema = mongoose.Schema({

    score: {
        type: number,
        required: true,
    },

    freeText: {
        type: String,
        required: true,
    },

    Bool: {
        type: Boolean,
        required: true,
    }
        
});

module.exports = mongoose.model('answer', answerSchema);