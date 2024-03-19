const express = require('express');
const router = express.Router();
const testController = require('../Controller/testController');

// Define la ruta POST para '/endpoint' y pasa el controlador como función de devolución de llamada
router.post('/endpoint', testController.endpointHandler);

module.exports = router;
