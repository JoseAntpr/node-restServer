const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const app = express();

app.get('/user', (req, res) => {
    res.json('get usuario');
});

app.post('/user', (req, res) => {

    let body = req.body;

    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    user.save((err, userDB) => {
        if( err) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        }

        res.status(200).json({
            ok: true,
            user: userDB
        });
    });

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