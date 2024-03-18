const mongoose = require('mongoose');
const questionSchema = mongoose.Schema({

    question: {
        type: String,
        required: true,
    },

    questionType: {
        type: String,
        required: true,
    },

    agree: {
        type: Boolean,
        required: true,
    },

    subsection: {
        type: String,
        required: true,
    },

    subsectionTitle: {
        type: String,
        required: true,
    },

    subsectionIntent: {
        type: String,
        required: true,
    },

    subsectionMetric: {
        type: String,
        required: true,
    },

    subsectionDescription: {
        type: String,
        required: true,
    }
        
});

module.exports = mongoose.model('question', questionSchema);