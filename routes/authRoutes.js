const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('mongoose').model('User');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const keys = require('../config/keys');
const passport = require('passport');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
})

passport.use(new GoogleStrategy({
    clientID: keys.client_id,
    clientSecret: keys.secret,
    callbackURL: "http://localhost:3000/auth/google/email",
    userProfileURL:"https://www.googleapis.com/oauth2/v3/userinfo"
  },

  async function(accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    console.log(profile.emails[0].value);
    // console.log(email);

    try {
      const existingUser = await User.findOne({ googleId: profile.id });
      if(existingUser) {
        cb(null, existingUser);
      } else {
        // console.log(profile);
        const user = await new User({ googleId: profile.id, email: profile.emails[0].value }).save();
        console.log(user);
        cb(null, user);
      }
    } catch(err) {
      console.log(err.message);
    }

  }
));

router.post('/signup', async (req, res) => {

    const { email, password } = req.body;
    if(!email || !password) return res.json({success: false, message: 'Email or password not entered'});

    try {

        const existingUser = await User.findOne({ email: email });
        if(existingUser) return res.json({success: false, message: 'Email already registered'});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt, null);

        const user = new User({ email: email, password: hashedPassword });
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
        if(user.googleId) return res.json({success: false, message: 'Invalid username or password'});

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


router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/email', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  async function(req, res) {
    // Successful authentication, redirect home.
    try {
      console.log(req.user);
      const token = await jwt.sign({id: req.user._id}, keys.JWT_SECRET_TOKEN);
      console.log(token);
      return res.json({success: true, token})
    } catch(err) {
      return res.send({success: false, message: err.message});
    }
  }
);


module.exports = router;