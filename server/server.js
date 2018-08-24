const express = require('express');
const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/user', (req, res) => {
    res.json('get usuario');
});

app.post('/user', (req, res) => {

    let body = req.body;


    res.json({
        string: 'post usuario',
        body
    });
});

app.put('/user/:id', (req, res) => {

    let id = req.params.id;
    res.json({
        string: 'put usuario',
        id
    });
});

app.listen(3000, () => {
    console.log('Escuchando puerto ', 3000);
});