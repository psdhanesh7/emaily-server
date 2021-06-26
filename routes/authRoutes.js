const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const keys = require('../config/keys');
const passport = require('passport');

passport.use(new GoogleStrategy({
    clientID: keys.client_id,
    clientSecret: keys.secret,
    callbackURL: "http://localhost:3000/auth/google/email",
    userProfileURL:"https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

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
            if(err) return res.json({success: false, message: err.message});
            if(!isMatch) return res.json({ success: false, message: 'Invalid email or password' });

            const token = await jwt.sign({id: user._id}, keys.JWT_SECRET_TOKEN);
            res.json({success: true, token})
        });

    } catch(err) {
        return res.send(err.message);
    }
})





router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/google/email', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


module.exports = router;