const mongoose = require('mongoose');
const router = require('express').Router();

const { weeklyScheduler, monthlyScheduler, yearlyScheduler, recurringScheduler } = require('./controllers/scheduler')
const { authenticatedOnly } = require('../middlewares/authMiddleware');


const Email = mongoose.model('emails');

router.get('/history', authenticatedOnly, async (req, res) => {

    try {
        const emails = await Email.find({ _user: req.user.id, count: { $gt: 0 } });
        res.send({ success: true, emails });

    } catch(err) {
        res.send({success: false, message: err.message});
    }
});

router.get('/scheduled', authenticatedOnly, async (req, res) => {
    try {
        const emails = await Email.find({ _user: req.user.id, count: { $eq: 0 } });
        res.send({ success: true, emails });
    } catch(err) {
        res.send({ success: false, message: err.message });
    }
})

router.post('/recurring', authenticatedOnly, async (req, res) => {
    const { title, subject, body, recipients, schedule } = req.body;
    
    const email = {
        title,
        subject,
        body,
        recipients: recipients.split(',').map(recipient => recipient.trim()),
        _user: req.user.id,
        createdDate: Date.now(),
        type: 'weekly'
    };

    try {
        await recurringScheduler(email, schedule);
        res.send({ success: true, message: 'Mail scheduled successfully' });
    } catch(err) {
        res.status(401).send(err);
    }
});

router.post('/weekly', authenticatedOnly, async (req, res) => {

    const { title, subject, body, recipients, schedule } = req.body;

    const email = {
        title,
        subject,
        body,
        recipients: recipients.split(',').map(recipient => recipient.trim()),
        _user: req.user.id,
        createdDate: Date.now(),
        type: 'weekly'
    };

    try {
        await weeklyScheduler(email, schedule);
        res.send({ success: true, message: 'Mail scheduled successfully' });
    } catch(err) {
        res.status(401).send(err);
    }

});

router.post('/monthly', authenticatedOnly, async (req, res) => {
    const { title, subject, body, recipients, schedule } = req.body;

    const email = {
        title,
        subject,
        body,
        recipients: recipients.split(',').map(recipient => recipient.trim()),
        _user: req.user.id,
        createdDate: Date.now(),
        type: 'monthly'
    };

    console.log(email);
    
    try {
        await monthlyScheduler(email, schedule);
        res.send({ success: true, message: 'Mail scheduled successfully' });
    } catch(err) {
        res.status(401).send(err);
    }
});

router.post('/yearly', authenticatedOnly, async (req, res) => {
    const { title, subject, body, recipients, schedule } = req.body;

    const email = {
        title,
        subject,
        body,
        recipients: recipients.split(',').map(recipient => recipient.trim()),
        _user: req.user.id,
        createdDate: Date.now(),
        type: 'yearly'
    };
    
    try {
        await yearlyScheduler(email, schedule);
        res.send({ success: true, message: 'Mail scheduled successfully' });
    } catch(err) {
        res.status(401).send(err);
    }
})

// router.post('/', authenticatedOnly, async (req, res) => {
//     const { title, subject, body, recipients } = req.body;
//     console.log(title, subject, body, recipients.split(',').map(recipient => recipient.trim()), req.user);

//     const email = new Email({
//         title,
//         subject,
//         body,
//         recipients: recipients.split(',').map(recipient => recipient.trim()),
//         _user: req.user.id,
//         createdDate: Date.now(),
        
//     });

//     // Great place to create an email
//     const response = await Mailer(email, emailTemplate(email));
//     // const response = mailer.send();

//     res.send(response);

// });

module.exports = router;