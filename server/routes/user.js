const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const User = require('../models/user');
const app = express();

app.get('/user', (req, res) => {

    let from = Number(req.query.from) || 0; 
    let limit = Number(req.query.limit) || 5;

    User.find({ state: true }, 'name state google email role')
        .skip(from)
        .limit(limit)
        .exec( (err, users) => {
            if( err ) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            User.count({ state: true }, (err, cont) => {

                if( err ) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }

                res.status(200).json({
                    ok: true,
                    total: cont,
                    users,
                });

            });
        });
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
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'state']);

    User.findByIdAndUpdate( id, body,{ new: true, runValidators: true }, (err, userDB) => {
        if( err ) {
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

app.delete('/user/:id', (req, res) => { 

    let id = req.params.id;

    let changeState = {
        state: false
    };

    // User.findByIdAndRemove(id, (err, deletedUser) => {
    User.findByIdAndUpdate(id, changeState,{ new: true } ,(err, deletedUser) => {
        if( err ) {
            return res.status(400).json({
                ok: false,
                error: err
                
            }); 
        };

        if( !deletedUser ) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'Usuario no encontrado',
                }
            }); 
        }

        res.json({
            ok: true,
            user: deletedUser
        });
    });
});

module.exports = app;