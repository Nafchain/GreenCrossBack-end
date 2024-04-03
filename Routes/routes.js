const express = require('express');
const router = express.Router();
const testController = require('../Controller/testController');
const adminController = require('../Controller/adminController');

// Define the POST route for '/setFormResults' and pass the setFormResults controller as the callback function
router.post('/setFormResults', testController.setFormResults);

// Define the GET route for '/getUserForm' and pass the getUserForm controller as the callback function
router.get('/getUserForm', testController.getUserForm);

// Define the GET route for '/getUserTest' and pass the getUserTest controller as the callback function
router.get('/getUserTest', testController.getUserTest);

// Define the GET route for '/loginUser' and pass the loginUser controller as the callback function
router.post('/loginUser', adminController.loginUser);

// Define the POST route for '/encryptPassword' and pass the encryptPassword controller as the callback function
router.post('/encryptPassword', adminController.encryptPassword);

// Define the POST route for '/updatePassword' and pass the updatePassword controller as the callback function
router.post('/updatePassword', adminController.updatePassword);

module.exports = router;
