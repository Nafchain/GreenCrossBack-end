const express =require('express');
const conectDB= require('./Config/dataBase');
const cors =require("cors");
const app=express();

const PORT = process.env.PORT || 3000;



conectDB();
app.use(cors());
app.use(express.json());

app.use('/api/user', require('./Routes/routes'));


app.listen(PORT, ()=>{
    console.log('The server is runing');
})