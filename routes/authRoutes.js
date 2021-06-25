const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');

const keys = require('../config/keys');

router.post('/signup', async (req, res) => {

    const { email, password } = req.body;
    if(!email || !password) return res.json({success: false, message: 'Email or password not entered'});

    try {
        const user = new User({ email: email, password: password });
        await user.save();

        res.json({success: true, message: 'User created succesfully'});
    } catch(err) {
        return res.status(422).send(err.message);
    }
});

router.post('/login', async (req, res) => {

    const { email, password } = req.body;
    if(!email || !password ) return res.json({success: false, message: 'Email or password not provided'});

    try {
        const user = await User.findOne({ email: email });
        if(!user) return res.json({success: false, message: 'Invalid username or password'});

        user.comparePassword(password, async (err, isMatch) => {
            if(err) return done(err);
            if(!isMatch) return done(null, false, { success: false, message: 'Invalid email or password' });

            const token = await jwt.sign({id: user._id}, keys.JWT_SECRET_TOKEN);
            res.json({success: true, token})
        });

    } catch(err) {
        return res.send(err.message);
    }
})

module.exports = router;