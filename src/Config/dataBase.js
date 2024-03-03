const dataBase = require('mongoose');

require('dotenv').config({
    path: 'variables.env'
});

const conectDB = async () => {

    try {

        await dataBase.connect(process.env.DB_dataBase, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })

        console.log('database conected');

    } catch (error) {

        console.log(error);
        process.exit(1);
    }

}

module.exports = conectDB;