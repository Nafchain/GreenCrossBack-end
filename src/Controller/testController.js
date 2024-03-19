const express = require('express');
const bodyParser = require('body-parser');
const answerModel = require("../Model/answerModel");
const userInfoModel = require("../Model/userInfoModel");

// Crear una aplicación Express
const app = express();

// Utilizar el middleware body-parser para analizar el cuerpo de las solicitudes
app.use(bodyParser.json());

// Ruta para manejar las solicitudes POST a /endpoint
app.post('/endpoint', async (req, res) => {
  try {
    console.log('Llega 1');
    // Obtener el JSON de la solicitud
    const { userInfo } = req.body;

    // Verificar si userInfo y userInfo.jsonData están definidos
    if (!userInfo || !userInfo.jsonData) {
      throw new Error('Invalid JSON data. Make sure userInfo and userInfo.jsonData are defined.');
    }

    // Crear una instancia del modelo userInfoModel y asignar los datos
    const saveUserInfo = new userInfoModel({
      jsonData: userInfo.jsonData
    });

    // Guardar la instancia en la base de datos
    await saveUserInfo.save();

    // Respuesta exitosa
    console.log('Llega');
    return res.status(200).json({
      message: 'Datos guardados exitosamente'
    });
  } catch (error) {
    // Manejar errores
    console.error(error);
    return res.status(500).json({
      message: 'Error al guardar los datos',
      error: error.message
    });
  }
});

// Iniciar el servidor en el puerto 3000
const port = 3000;
app.listen(port, () => {
  console.log(`El servidor está corriendo en el puerto ${port}`);
});
