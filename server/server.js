require('./config/config');

const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Enable public directory
app.use( express.static( path.resolve(__dirname, '../public')));

// Routes global config
app.use(require('./routes/index'));

console.log(process.env.URLDB);

mongoose.connect(process.env.URLDB,{ useNewUrlParser: true }, (err, res) => {

    if( err ) throw err;

    console.log('BD online !!');

});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto ', 3000);
});