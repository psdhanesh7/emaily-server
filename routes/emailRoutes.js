const mongoose = require('mongoose');
const router = require('express').Router();

const { weeklyScheduler, monthlyScheduler, yearlyScheduler, recurringScheduler } = require('./controllers/scheduler')
const { authenticatedOnly } = require('../middlewares/authMiddleware');
const emailTemplate = require('../services/emailTemplates/emailTemplate');
const Mailer = require('../services/Mailer');

const Email = mongoose.model('emails');

router.post('/recurring', authenticatedOnly, async (req, res) => {
    const { title, subject, body, recipients, schedule } = req.body;
    
    const email = new Email({
        title,
        subject,
        body,
        recipients: recipients.split(',').map(recipient => recipient.trim()),
        _user: req.user.id,
        createdDate: Date.now(),
        type: 'weekly'
    });

    try {
        await recurringScheduler(email, schedule);
        res.send({ success: true, message: 'Mail scheduled successfully' });
    } catch(err) {
        res.status(401).send(err);
    }
});

router.post('/weekly', authenticatedOnly, async (req, res) => {

    const { title, subject, body, recipients, schedule } = req.body;

    const email = new Email({
        title,
        subject,
        body,
        recipients: recipients.split(',').map(recipient => recipient.trim()),
        _user: req.user.id,
        createdDate: Date.now(),
        type: 'weekly'
    });

    try {
        await weeklyScheduler(email, schedule);
        res.send({ success: true, message: 'Mail scheduled successfully' });
    } catch(err) {
        res.status(401).send(err);
    }

});

router.post('/monthly', authenticatedOnly, async (req, res) => {
    const { title, subject, body, recipients, schedule } = req.body;

    const email = new Email({
        title,
        subject,
        body,
        recipients: recipients.split(',').map(recipient => recipient.trim()),
        _user: req.user.id,
        createdDate: Date.now(),
        type: 'monthly'
    });
    
    try {
        await monthlyScheduler(email, schedule);
        res.send({ success: true, message: 'Mail scheduled successfully' });
    } catch(err) {
        res.status(401).send(err);
    }
});

router.post('/yearly', authenticatedOnly, async (req, res) => {
    const { title, subject, body, recipients, schedule } = req.body;

    const email = new Email({
        title,
        subject,
        body,
        recipients: recipients.split(',').map(recipient => recipient.trim()),
        _user: req.user.id,
        createdDate: Date.now(),
        type: 'yearly'
    });
    
    try {
        await yearlyScheduler(email, schedule);
        res.send({ success: true, message: 'Mail scheduled successfully' });
    } catch(err) {
        res.status(401).send(err);
    }
})

router.post('/', authenticatedOnly, async (req, res) => {
    const { title, subject, body, recipients } = req.body;
    console.log(title, subject, body, recipients.split(',').map(recipient => recipient.trim()), req.user);

    const email = new Email({
        title,
        subject,
        body,
        recipients: recipients.split(',').map(recipient => recipient.trim()),
        _user: req.user.id,
        createdDate: Date.now(),
        
    });

    // Great place to create an email
    const response = await Mailer(email, emailTemplate(email));
    // const response = mailer.send();

    res.send(response);

});

module.exports = router;