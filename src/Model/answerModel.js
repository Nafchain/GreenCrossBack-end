const mongoose = require('mongoose');
const answerSchema = mongoose.Schema({

    jsonData: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    }
        
});

module.exports = mongoose.model('test', answerSchema);