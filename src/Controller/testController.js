const userInfoModel = require("../Model/userInfoModel");
const answerModel = require("../Model/answerModel");

// Controlador para manejar las solicitudes POST a /endpoint
async function endpointHandler(req, res) {
    try {
        console.log('Llega 1');
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
                user: userInfo.user
            });

            // Guardar la instancia en la base de datos
            await saveUserInfo.save();
        }

        // Guardar datos de answerInfo si está definido
        if (answerInfo) {
            // Crear una instancia del modelo answerModel y asignar los datos
            const saveAnswerInfo = new answerModel({
                questions: answerInfo.questions
            });

            // Guardar la instancia en la base de datos
            await saveAnswerInfo.save();
        }

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
}

module.exports = { endpointHandler };
