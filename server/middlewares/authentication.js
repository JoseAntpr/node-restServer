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
                error: {
                    message: 'Not valid token'
                }
            });
        }

        req.user = decoded.user;

        next();
    });
}

/* 
=======================
Verify AdminRole
=======================
*/

let verify_AdminRole = (req, res, next) => {
    let user = req.user;

    if( user.role !== 'ADMIN_ROLE') {
        return res.json({
            ok: false,
            error: {
                message: 'User is not admin'
            }
        });
    }

    next();

    
}

/* 
=======================
Verify imageToken
=======================
*/

verifyImgToken = (req, res, next ) => {
    let token = req.query.token;

    jwt.verify( token, process.env.SEED, (err, decoded) => {

        if( err ) {
            return res.status(401).json({
                ok: false,
                error: {
                    message: 'Not valid token'
                }
            });
        }

        req.user = decoded.user;

        next();
    });
}


module.exports = {
    verifyToken,
    verify_AdminRole,
    verifyImgToken
}