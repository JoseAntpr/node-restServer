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

    file.mv('uploads/filename.jpg', (err) => {
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