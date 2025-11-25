require('dotenv').config();
const app = require('./app');
require('./database');

//Logica para iniciar el Servidor

async function main() {
    await app.listen(app.get('port'));
    console.log('Servidor ejecutandose en el puerto', app.get('port'));
}

main();