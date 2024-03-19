const express = require('express');
const router = express.Router();
const testController = require('../Controller/testController');

// Define the POST route for '/setFormResults' and pass the setFormResults controller as the callback function
router.post('/setFormResults', testController.setFormResults);

// Define the POST route for '/getUserForm' and pass the getUserForm controller as the callback function
router.post('/getUserForm', testController.getUserForm);

// Define the POST route for '/getUserTest' and pass the getUserTest controller as the callback function
router.post('/getUserTest', testController.getUserTest);

module.exports = router;
