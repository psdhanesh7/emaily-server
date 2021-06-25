const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const keys = require('./config/keys');
const authRouter = require('./routes/authRoutes');

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
    if(err) return console.log(err);
    console.log(`Listening to port ${PORT}`);
})