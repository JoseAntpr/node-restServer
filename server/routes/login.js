const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Google auth
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

const User = require("../models/user");

const app = express();

app.post("/login", (req, res) => {
  let body = req.body;

  User.findOne({ email: body.email }, (err, userDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        error: err
      });
    }

    if (!userDB) {
      return res.status(400).json({
        ok: false,
        error: {
          message: "(User) or password are incorrect"
        }
      });
    }

    if (!bcrypt.compareSync(body.password, userDB.password)) {
      return res.status(400).json({
        ok: false,
        error: {
          message: "User or (password) are incorrect"
        }
      });
    }

    let token = jwt.sign(
      {
        user: userDB
      },
      process.env.SEED,
      { expiresIn: process.env.EXPIRES }
    );

    res.json({
      ok: true,
      user: userDB,
      token: token
    });
  });
});

// Google configs
async function verify( token ) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
}

app.post("/google", (req, res) => {
  let token = req.body.idtoken;

  verify( token );

  res.json({
    token
  });
});

module.exports = app;
