const userInfoModel = require("../Model/userInfoModel");
const answerModel = require("../Model/answerModel");

// Controlador para manejar las solicitudes POST a /endpoint
async function setFormResults(req, res) {
    try {
        // Obtener el JSON de la solicitud
        const { userInfo, answerInfo } = req.body;

        // Verificar si al menos uno de los datos está definido
        if (!userInfo && !answerInfo) {
            throw new Error('Invalid JSON data. Make sure userInfo or answerInfo is defined.');
        }

        // Guardar datos de userInfo si está definido
        if (userInfo) {
            // Crear una instancia del modelo userInfoModel y asignar los datos
            const saveUserInfo = new userInfoModel({
                user: userInfo.user,
            });

            // Guardar la instancia en la base de datos
            await saveUserInfo.save();
        }

        // Guardar datos de answerInfo si está definido
        if (answerInfo) {
            // Crear una instancia del modelo answerModel y asignar los datos
            const saveAnswerInfo = new answerModel({
                questions: answerInfo.questions,
                id: userInfo.user.id
            });

            // Guardar la instancia en la base de datos
            await saveAnswerInfo.save();
        }

        // Respuesta exitosa
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
}

async function getUserForm(req, res) {
    try {
        // Obtener todos los usuarios de la base de datos
        const users = await userInfoModel.find();

        // Respuesta exitosa con los usuarios recuperados
        return res.status(200).json(users);
    } catch (error) {
        // Manejar errores
        console.error(error);
        return res.status(500).json({
            message: 'Error al obtener los usuarios',
            error: error.message
        });
    }
}

async function getUserTest(req, res) {
  try {
      // Obtener el ID del usuario desde la solicitud
      const { id } = req.query;

      // Verificar si userId está definido
      if (!id) {
          throw new Error('Invalid parameter. Make sure userId is defined.');
      }

      // Buscar en la tabla tests del answerInfo por el ID del usuario
      const userTest = await answerModel.findOne({ id: id });

      // Verificar si se encontraron resultados para el usuario
      if (!userTest) {
          throw new Error('No test results found for the user.');
      }

      // Respuesta exitosa con los resultados del test del usuario.
      return res.status(200).json(userTest);
  } catch (error) {
      // Manejar errores
      console.error(error);
      return res.status(500).json({
          message: 'Error al obtener los resultados del test del usuario',
          error: error.message
      });
  }
}

async function updateReviewStatus(req, res) {
    try {
        // Obtener el ID del usuario desde la solicitud
        const { userId } = req.body;

        // Verificar si el ID del usuario está definido
        if (!userId) {
            throw new Error('Invalid parameter. Make sure userId is defined.');
        }

        // Buscar el usuario en la base de datos
        const user = await userInfoModel.findOne({ "user.id": userId });

        // Verificar si se encontró el usuario
        if (!user) {
            throw new Error('User not found.');
        }

        // Obtener la fecha del sistema
        const currentDate = new Date();

        // Actualizar el booleano review a true y guardar la fecha del sistema en la tabla users
        user.review = true;
        user.createdDate = currentDate;
        await user.save();

        // Respuesta exitosa
        return res.status(200).json({
            message: 'El booleano review se ha actualizado a true y la fecha del sistema se ha guardado exitosamente.'
        });
    } catch (error) {
        // Manejar errores
        console.error(error);
        return res.status(500).json({
            message: 'Error al actualizar el booleano review y guardar la fecha del sistema',
            error: error.message
        });
    }
}

module.exports = { setFormResults, getUserForm, getUserTest, updateReviewStatus };

// // Iniciar el servidor en el puerto 3000
// const port = 3000;
// app.listen(port, () => {
//   console.log(`El servidor está corriendo en el puerto ${port}`);
// });
