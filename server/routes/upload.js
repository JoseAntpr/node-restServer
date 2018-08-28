const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();

const User = require('../models/user');
const Product = require('../models/product');

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

        userImage(id, res, fileName)
    });
});

function userImage(id, res, fileName) {
    User.findById(id, ( err, userDB ) => {
        if(err) {
            return res.status(500).json({
                ok: false,
                error: err
            });
        }

        if( !userDB ) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'User not exists'
                }
            });
        }

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

function productImage() {

}

module.exports = app;