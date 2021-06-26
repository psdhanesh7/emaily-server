const keys = require('../config/keys');
const sgMail = require('@sendgrid/mail');

module.exports = async ({ subject, recipients }, content) => {

    try {
        sgMail.setApiKey(keys.SENDGRID_API_KEY);
        const formattedRecipients = recipients;
        console.log(formattedRecipients);
        //   const formattedRecipients = recipients.map(({email}) => email);
        const msg = {
            to: formattedRecipients,
            from: 'psdhanesh7@cet.ac.in',
            subject: subject,
            html: content,
        };
        const response =  await sgMail.send(msg);
        console.log(response);
        console.log('Email send');
    } catch(err) {
        console.log(err.message)
    }

}



// const sendgrid = require('sendgrid');
// const keys = require('../config/keys');
// const helper = sendgrid.mail;

// class Mailer extends helper.Mail {


//     constructor({ subject, recipients }, content) {
//         super();

//         this.sgApi = sendgrid(keys.SENDGRID_API_KEY);
//         this.fron_email = new helper.Email('psdhanesh7@cet.ac.in');
//         this.subject = subject;
//         this.body = new helper.Content('text/html', content);
//         this.recipients = this.formatAddresses(recipients);

//         console.log(this.recipients);

//         this.addContent(this.body);
//         this.addClickTracking();
//         this.addRecipients();
//     }

//     formatAddresses(recipients) {
//         return recipients.map(recipient => {
//             return new helper.Email(recipient);
//         })
//     }

//     addClickTracking() {
//         const trackingSettings = new helper.TrackingSettings();
//         const clickTracking = new helper.ClickTracking(true, true);

//         trackingSettings.setClickTracking(clickTracking);
//         this.addTrackingSettings(trackingSettings);
//     }

//     addRecipients() {
//         const personalize = new helper.Personalization();

//         this.recipients.forEach(recipient => {
//             personalize.addTo(recipient);
//         });
//         this.addPersonalization(personalize);
//     }

//     async send() {

//         try {
//             const request = this.sgApi.emptyRequest({
//                 method: 'POST',
//                 path: '/v3/mail/send',
//                 body: this.toJSON()
//             });
    
//             const response = await this.sgApi.API(request);    
//             return response;
//         } catch(err) {
//             console.log(err);
//         }
//     }

// }

// module.exports = Mailer;