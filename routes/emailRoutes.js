const mongoose = require('mongoose');
const router = require('express').Router();

const { authenticatedOnly } = require('../middlewares/authMiddleware');
const emailTemplate = require('../services/emailTemplates/emailTemplate');
const Mailer = require('../services/Mailer');

const Email = mongoose.model('emails');

router.post('/', authenticatedOnly, (req, res) => {
    const { title, subject, body, recipients } = req.body;
    console.log(title, subject, body, recipients.split(',').map(recipient => recipient.trim()), req.user);

    const email = new Email({
        title,
        subject,
        body,
        recipients: recipients.split(',').map(recipient => recipient.trim()),
        _user: req.user.id
    });

    // Great place to create an email
    const response = Mailer(email, emailTemplate(email));
    // const response = mailer.send();

    res.send(response);

});

module.exports = router;