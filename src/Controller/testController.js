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

// Ruta para manejar las solicitudes POST a /endpoint
app.post('/setFormularioResuelto', async (req, res) => {
  try {
    console.log('Llega 1');
    
    // Obtener los JSON de la solicitud
    const { userInfo, respuestas } = req.body;

    // Verificar si userInfo y respuestas están definidos
    if (!userInfo || !respuestas) {
      throw new Error('Invalid JSON data. Make sure userInfo and respuestas are defined.');
    }

    // Log userInfo and respuestas
    console.log('UserInfo:', userInfo);
    console.log('Respuestas:', respuestas);

    // You can continue with other operations here if needed

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


const faker = require('faker');

// Function to generate mock data for a person
function generateMockPerson() {
  return {
    id: faker.random.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    title: faker.name.jobTitle(),
    companyName: faker.company.companyName(),
    industry: faker.company.bs(),
    companySize: faker.random.arrayElement(['1-10', '11-50', '51-200', '201-500', '501-1000', '1000-5000']),
    acceptTerms: true
  };
}

// Ruta para manejar las solicitudes GET a /getFormulariosResueltos
app.get('/getFormulariosResueltos', async (req, res) => {
  try {
    console.log('Llega 1');

    // Generate 5 mock people
    const people = Array.from({ length: 5 }, generateMockPerson);

    // Respuesta exitosa con la lista de personas aleatorias
    return res.status(200).json(people);
  } catch (error) {
    // Manejar errores
    console.error(error);
    return res.status(500).json({
      message: 'Error al generar los datos mock',
      error: error.message
    });
  }
});


// Ruta para manejar las solicitudes POST a /endpoint
app.get('/getFormularioRelleno', async (req, res) => {
  try {
    console.log('Llega 1');
    // Obtener el parámetro de la solicitud
    const { userId } = req.query;

    // Verificar si userId está definido
    if (!userId) {
      throw new Error('Invalid parameter. Make sure userId is defined.');
    }

    // Mocked JSON response
    const mockedResponse = { answer: 'ok' };

    // Respuesta exitosa con la respuesta mockeada
    console.log('Llega');
    return res.status(200).json(mockedResponse);
  } catch (error) {
    // Manejar errores
    console.error(error);
    return res.status(500).json({
      message: 'Error al obtener los datos',
      error: error.message
    });
  }
});






// Iniciar el servidor en el puerto 3000
const port = 3000;
app.listen(port, () => {
  console.log(`El servidor está corriendo en el puerto ${port}`);
});
