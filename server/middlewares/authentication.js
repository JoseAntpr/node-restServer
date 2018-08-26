const jwt = require('jsonwebtoken');

/* 
=======================
Verify token
=======================
*/

let verifyToken = (req, res, next) => {
    let token = req.get('Authorization');

    jwt.verify( token, process.env.SEED, (err, decoded) => {

        if( err ) {
            return res.status(401).json({
                ok: false,
                error: err
            });
        }

        req.user = decoded.user;

        next();
    });
}


module.exports = {
    verifyToken
}