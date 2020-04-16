const jwt = require('jsonwebtoken');

const User = require('../models/user');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify( token, 'RANDOM_TOKEN_SECRET' );
        const userId = decodedToken.userId;
        if ( req.body.userId && req.body.userId !== userId ) {
            throw 'Invalid user ID';
        }
        else {
            User.findOne( { _id: req.body.userId } )
                .then( user => {
                    if( user.role !== 'ADMIN' ) throw 'Not allowed action'
                })
                .catch( error => res.status(404).json({ error }) );

            next();
        }
    }
    catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};
