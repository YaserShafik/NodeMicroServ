const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
process.loadEnvFile()

const app = express()
const PORT = process.env.PORT || 4003

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(express.json())
app.use(express.urlencoded({extended:false}));

const consultRoutes = require('./routes/consultRoutes')
app.use('/consults', consultRoutes)

try{
    app.listen(PORT, () => {
        console.log(`Orders service running on port ${PORT}`);
    });
}catch(error){
    console.error(error);
    
}