const mongoose = require('mongoose');

// URL de conexión a tu base de datos MongoDB en Atlas
const MONGODB_URI = 'mongodb+srv://nafchainadm:keeIPU3o5Wzn6V5H@cluster0.rtmf53d.mongodb.net/DB_dataBase';


// Opciones de conexión a la base de datos
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
  // Elimina las opciones useCreateIndex y useFindAndModify
};

// Función para conectar a la base de datos
async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI, options);
    console.log('Conexión a la base de datos establecida');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
}

// Exportar la función de conexión para que pueda ser utilizada desde otros módulos
module.exports = connectDB;
