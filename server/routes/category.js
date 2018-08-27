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

});

/* 
=======================
Show a category by ID
=======================
*/
app.get('/category/:id', (req, res) => {

});

/* 
=======================
Create category
=======================
*/

app.post('/category', verifyToken, (req, res) => {

});

/* 
=======================
Update category
=======================
*/
app.put('/category', verifyToken, (req, res) => {

});

/* 
=======================
Update category
=======================
*/

