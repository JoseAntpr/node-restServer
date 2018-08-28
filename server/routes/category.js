const express = require('express');

let { verifyToken } = require('../middlewares/authentication');

let app = express();

let Category = require('../models/category');


/* 
=======================
Show all categories
=======================
*/
app.get('/category', (req, res) => {

    let from = Number(req.query.from) || 0;
    let limit = Number(req.query.limit) || 10;

    Category.find({})
        .skip( from )
        .limit( limit )
        .exec((err, categories) => {
            if( err ) {
                res.status(400).json({
                    ok: false,
                    error: err
                });
            }
            Category.count({}, (err, cont) => {
                if(err) {
                    res.status(400).json({
                        ok: false,
                        error: err
                    });
                }

                res.json({
                    ok: true,
                    total: cont,
                    categories 
                });
            });
        });
});

/* 
=======================
Show a category by ID
=======================
*/
app.get('/category/:id', (req, res) => {

    let id = req.params.id;

    Category.findById(id, (err, categoryBD) => {
        if( err ) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }

        if( !categoryBD) {
            res.status(404).json({
                ok: false,
                error: {
                    message: 'Category not exist'
                }
            });
        }

        res.json({
            ok: true,
            category: categoryBD
        });
    });

});

/* 
=======================
Create category
=======================
*/

app.post('/category', verifyToken, (req, res) => {
    
    let body = req.body;

    let category = new Category({
        description: body.description,
        user: req.user._id
    });

    category.save((err, categoryBD) => {
        if( err ) {
            res.status(500).json({
                ok: false,
                error: error
            });
        }

        if(!categoryBD) {
            res.status(400).json({
                ok: false,
                error: {
                    message: 'Category can not created'
                }
            });
        }

        res.json({
            ok: true,
            category: categoryBD
        });
    });

});

/* 
=======================
Update category
=======================
*/
app.put('/category/:id', verifyToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let descCategoria = {
        description: body.description
    }

    Category.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true }, (err, categoryDB) => {
        if( err ) {
            res.status(500).json({
                ok: false,
                error: error
            });
        }

        if(!categoryDB) {
            res.status(400).json({
                ok: false,
                error: {
                    message: 'Category can not created'
                }
            });
        }

        res.json({
            ok: true,
            category: categoryDB
        })
    });

});

/* 
=======================
Delete category
=======================
*/

module.exports = app;

