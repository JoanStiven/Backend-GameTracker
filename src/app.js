const express = require('express');
const cors = require('cors');
const app = express();

// Configuraciones del Servidor
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/juegos', require('./routes/juegoRoute'));
app.use('/api/resenas', require('./routes/resenaRoute'));

module.exports = app;



