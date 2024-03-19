const express = require('express');
const conectDB = require('./Config/dataBase');
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => { res.send("Express on Vercel"); }); 

app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}`); 
});

module.exports = app;

conectDB();
app.use(cors());
app.use(express.json());

app.use('/api/user', require('./Routes/routes'));


app.listen(PORT, () => {
    console.log('The server is runing');
})