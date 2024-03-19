const mongoose = require('mongoose');
const answerSchema = mongoose.Schema({

    questions: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },

    id: {
        type: String,
        required: true
    }
        
});

module.exports = mongoose.model('test', answerSchema);