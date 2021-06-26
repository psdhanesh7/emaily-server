const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const authenticatedOnly = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.status(401).send({success: false, message: 'Permission denied'});

    try {
        const user = await jwt.verify(token, keys.JWT_SECRET_TOKEN);
        req.user = user;
        next();
    } catch(err) {
        res.status(403).send({success: false, message: 'Permission denied'});
    }

}

module.exports = { authenticatedOnly };