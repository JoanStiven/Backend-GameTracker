const mongoose = require('mongoose');

//Cadena de conexion a la base de datos 

const URI = process.env.MONGODB_URI;
 
mongoose.connect(URI)

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Base de datos conectada exitosamente');
});