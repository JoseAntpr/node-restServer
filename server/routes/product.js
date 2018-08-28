const express = require("express");
const _ = require("underscore");

const { verifyToken } = require("../middlewares/authentication");

let app = express();

let Product = require("../models/product");

/* 
=======================
Get products
=======================
*/

app.get("/product", (req, res) => {
  let from = Number(req.query.from) || 0;

  Product.find({ available: true })
    .skip(from)
    .limit(5)
    .populate("user", "nombre email")
    .populate("category", "descripcion")
    .exec((err, products) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          error: err
        });
      }

      Product.count({}, (err, cont) => {
        if (err) {
          return res.status(500).json({
            ok: false,
            error: err
          });
        }

        res.json({
          ok: true,
          total: cont,
          products: products
        });
      });
    });
});

/* 
=======================
Get product by ID
=======================
*/

app.get("/product/:id", (req, res) => {
  //Populate: USER & Category

  let id = req.params.id;

  Product.findById(id)
    .populate("user", "nombre email")
    .populate("category", "descripcion")
    .exec((err, productDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          error: err
        });
      }

      if (!productDB) {
        return res.statys(400).json({
          ok: false,
          error: {
            message: "Product not exists"
          }
        });
      }

      return res.json({
        ok: true,
        product: productDB
      });
    });
});

/* 
=======================
Create product
=======================
*/

app.post("/product", verifyToken, (req, res) => {
  let body = req.body;

  let product = new Product({
    name: body.name,
    priceUni: body.priceUni,
    description: body.description,
    available: body.available,
    category: body.category,
    user: req.user._id
  });

  product.save((err, productDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        error: err
      });
    }

    res.status(201).json({
      ok: true,
      product: productDB
    });
  });
});

/* 
=======================
Update product
=======================
*/

app.put("/product/:id", verifyToken, (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ["name", "priceUni", "description", "available"]);

  Product.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true },
    (err, productDB) => {
      if (err) {
        return res.statys(500).json({
          ok: false,
          error: err
        });
      }

      if (!productDB) {
        return res.statys(400).json({
          ok: false,
          error: {
            message: "Product not exists"
          }
        });
      }

      res.json({
        ok: true,
        product: productDB
      });
    }
  );
});

/* 
=======================
Delete product
=======================
*/
app.delete("/product/:id", verifyToken, (req, res) => {
  // Grabar user
  // Grabar categoria del listado

  let id = req.params.id;

  Product.findByIdAndRemove(id, (err, productDB) => {
    if (err) {
      res.status(500).json({
        ok: false,
        error: error
      });
    }

    if (!productDB) {
      res.status(400).json({
        ok: false,
        error: {
          message: "id not exists"
        }
      });
    }

    res.json({
      ok: true,
      message: "Product deleted"
    });
  });
});

module.exports = app;
