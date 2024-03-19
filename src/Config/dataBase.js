const mongoose = require('mongoose');

// Intentar conectar a la base de datos
mongoose.connect('mongodb+srv://nafchainadm:keeIPU3o5Wzn6V5H@cluster0.rtmf53d.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  socketTimeoutMS: 30000, 
})
.then(() => {
  console.log('Conexión establecida con la base de datos');
})
.catch((error) => {
  console.error('Error de conexión a la base de datos:', error);
});
