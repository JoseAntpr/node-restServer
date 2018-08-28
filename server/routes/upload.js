const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();

// default options
app.use(fileUpload());

app.put('/upload', (req, res) => {
    if( !req.files ) {
        return res.status(400).json({
            ok: false,
            error: {
                message: 'No Files were uploaded'
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


    file.mv(`uploads/${file.name}`, (err) => {
        if(err) return res.status(500).json({
            ok: false,
            error: err
        });

        res.json({
            ok: true,
            message: 'Image uploaded'
        });
    });
});

module.exports = app;