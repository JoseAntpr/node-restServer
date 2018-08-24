const express = require('express');
const app = express();

app.get('/user', (req, res) => {
    res.json('get usuario');
});

app.post('/user', (req, res) => {

    let body = req.body;

    if( body.name === undefined ) {
        res.status(400).json({
            ok: false,
            message: 'Name is required'
        })
    } else {
        res.json({
            string: 'post usuario',
            body
        });
    }

});

app.put('/user/:id', (req, res) => {

    let id = req.params.id;
    res.json({
        string: 'put usuario',
        id
    });
});

app.delete('/user', (req, res) => { 
    res.json('delete Usuario');
});

module.exports = app;