const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const User = require('mongoose').model('User');

const authenticatedOnly = async (req, res, next) => {

    if(req.isAuthenticated()) next();

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);
    if(token == null) return res.status(401).send({success: false, message: 'Permission denied'});

    try {
        const user = await jwt.verify(token, keys.JWT_SECRET_TOKEN);
        console.log('Token verified');
        const res = await User.findById(user.id);
        console.log(res);
        req.user = {id: res.id, email: res.email};
        next();
    } catch(err) {
        res.status(403).send({success: false, message: 'Permission denied'});
    }

}

module.exports = { authenticatedOnly };