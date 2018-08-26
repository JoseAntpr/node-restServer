const environments = require('./environments');

/* 
=======================
Puerto
=======================
*/

process.env.PORT = process.env.PORT || 3000;


/* 
=======================
Vencimiento del TOKEN
=======================
*/
process.env.EXPIRES = '4h';

/* 
=======================
Seed de autenticacion
=======================
*/
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarollo';

/* 
=======================
Entorno
=======================
*/

process.env.NODE_ENV =  process.env.NODE_ENV || 'dev';

/* 
=======================
Base de datos
=======================
*/

let urlDB;

if( process.env.NODE_ENV === 'dev' ) {
    urlDB = environments.dev.mongoURL;
} else {
    urlDB = environments.prod.mongoURL;
}

process.env.URLDB = urlDB;