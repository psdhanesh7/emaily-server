const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

require('./models/User');
require('./models/Email');

const keys = require('./config/keys');
const authRouter = require('./routes/authRoutes');
const emailRouter = require('./routes/emailRoutes');

mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
.then(() => console.log("DATABASE: Connection to database successful!"))
.catch(err => console.log("DATABASE: " + err));

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/api/emails', emailRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
    if(err) return console.log(err);
    console.log(`Listening to port ${PORT}`);
})