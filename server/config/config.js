const environments = require('./environments');

/* 
=======================
Puerto
=======================
*/

process.env.PORT = process.env.PORT || 3000;


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
    console.log(environments.dev.mongoURL);
    urlDB = environments.dev.mongoURL;
} else {
    urlDB = environments.prod.mongoURL;
}

process.env.URLDB = urlDB;