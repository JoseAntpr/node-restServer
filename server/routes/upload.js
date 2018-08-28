const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();

const User = require('../models/user');
const Product = require('../models/product');

const fs = require('fs');
const path = require('path');

// default options
app.use(fileUpload());

app.put('/upload/:type/:id', (req, res) => {

    let type = req.params.type;
    let id = req.params.id;

    if( !req.files ) {
        return res.status(400).json({
            ok: false,
            error: {
                message: 'No Files were uploaded'
            }
        });
    }

    // Valid types

    let validTypes = ['products', 'users'];

    if( validTypes.indexOf(type) < 0 ) {
        return res.status(400).json({
            ok: false,
            error: {
                message: 'Valid types are ' + validTypes.join(', '),
            }
        });
    }


    let file = req.files.file;
    let fileNameSplit = file.name.split('.');
    let extension = fileNameSplit[ fileNameSplit.length -1 ];

    // Valid extensions
    let validExtensions = ['png', 'jpg', 'gif', 'jpeg'];

    if( validExtensions.indexOf( extension ) < 0 ) {
        return res.status(400).json({
            ok: false,
            error: {
                message: 'Valid extensions are ' + validExtensions.join(', '),
                ext: extension
            }
        });
    }

    // Change File name
    let fileName = `${id}-${ new Date().getMilliseconds()}.${ extension }`

    file.mv(`uploads/${ type }/${fileName}`, (err) => {
        if(err) return res.status(500).json({
            ok: false,
            error: err
        });

        // Image is uploaded

        if(type === 'users'){
            userImage(id, res, fileName);
        } else {
            productImage(id, res, fileName);
        }
    });
});

function userImage(id, res, fileName) {
    User.findById(id, ( err, userDB ) => {
        if(err) {
            deleteFile(fileName, 'users');
            return res.status(500).json({
                ok: false,
                error: err
            });
        }

        if( !userDB ) {
            deleteFile(fileName, 'users');
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'User not exists'
                }
            });
        }

        deleteFile(userDB.img, 'users');

        userDB.img = fileName;

        userDB.save((err, userSaved) => {
            res.json({
                ok: true,
                user: userSaved,
                img: fileName
            });
        });


    });
}

function productImage(id, res, fileName) {
    Product.findById(id, ( err, productDB ) => {
        if(err) {
            deleteFile(fileName, 'products');
            return res.status(500).json({
                ok: false,
                error: err
            });
        }

        if( !productDB ) {
            deleteFile(fileName, 'products');
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'Product not exists'
                }
            });
        }

        deleteFile(productDB.img, 'products');

        productDB.img = fileName;

        productDB.save((err, productSaved) => {
            res.json({
                ok: true,
                user: productSaved,
                img: fileName
            });
        });


    });
}

function deleteFile(filename, type) {
    let pathUrl = path.resolve(__dirname, `../../uploads/${type}/${ filename }`);

    if( fs.existsSync(pathUrl) ) {
        fs.unlinkSync(pathUrl);
    }
}

module.exports = app;