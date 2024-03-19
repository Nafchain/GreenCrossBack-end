const mongoose = require('mongoose');
const resultSchema = mongoose.Schema({

    minScore: {
        type: number,
        required: true,
    },

    title: {
        type: String,
        required: true,
    },

    description: {
        type: Boolean,
        required: true,
    },

    pointsToTake: {
        type: String[],
        required: true,
    }
        
});

module.exports = mongoose.model('result', resultSchema);