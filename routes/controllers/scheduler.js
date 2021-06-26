const cron = require('node-cron');
const mongoose = require('mongoose');
const Mailer = require('../../services/Mailer');
const emailTemplate = require('../../services/emailTemplates/emailTemplate');
const Email = mongoose.model('emails');

const recurringScheduler = async (email, { timeGap }) => {

  var count = 0;
  var emailDocId;

  try {
    const emailDoc = new Email(email);
    const response = await emailDoc.save();
    emailDocId = response._id;
    console.log(emailDocId);
  } catch(err) {
    console.log(err.message);
  }

  cron.schedule(`*/${timeGap} * * * * *`, async () => {
    console.log(`running a task every ${timeGap} sec`);
    // Send your email here!
    
    try {

      await Mailer(email, emailTemplate(email));
      email.sendDate = Date.now();
      count += 1;

      await Email.updateOne({ _id: emailDocId}, { $set: {"count": count, "sendDate": Date.now()}});
      console.log(`Updated count successfully: ${count}`);

    } catch(err) {
      console.log(err.message);
    }

  }, { timezone: "Asia/Kolkata" });
}

const weeklyScheduler = async (email, { day, time }) => {

  var count = 0;
  var emailDocId;

  try {
    const emailDoc = new Email(email);
    const response = await emailDoc.save();
    emailDocId = response._id;
    console.log(emailDocId);
  } catch(err) {
    console.log(err);
  }

  const [hour, minute, second] = time.split(':');
  // sec+' '+min+' '+hour+' '+'* * Sunday'
  cron.schedule(`${second} ${minute} ${hour} * * ${day}`, async () => {
    console.log('running a task every week');

    try {
      const response = await Mailer(email, emailTemplate(email));
      count += 1;

      if(count == 1) {
        await Email.updateOne({ _id: emailDocId }, {$set: { "count": count, "sendDate": Date.now() }});
        console.log('Updated to sent');
      } else {
        email.sendDate = Date.now();
        email.count = 1;
        await Email.insertMany([email]);

        console.log('Inserted new document');
      }

    } catch(err) {
      console.log(err.message);
    }
  }, { timezone: "Asia/Kolkata" });
  
}

const monthlyScheduler = async (email, { date, time }) => {

  var count = 0;
  var emailDocId;

  try {
    const emailDoc = new Email(email);
    const response = await emailDoc.save();
    emailDocId = response._id;
    console.log(emailDocId);
  } catch(err) {
    console.log(err);
  }

  const [hour, minute, second] = time.split(':');

  // sec+' '+min+' '+hour+' '+dat+'  * *'
  cron.schedule(`${second} ${minute} ${hour} ${date} * *`, async () => {
  // cron.schedule(`*/10 * * * * *`, async () => {

    console.log('running a task every minute');
    // Send your email here!
    try {
      const response = await Mailer(email, emailTemplate(email));
      count += 1;

      if(count == 1) {
        await Email.updateOne({ _id: emailDocId }, {$set: { "count": count, "sendDate": Date.now() }});
        console.log('Updated to sent');
      } else {
        email.sendDate = Date.now();
        email.count = 1;
        await Email.insertMany([email]);

        console.log('Inserted new document');
      }
    } catch(err) {
      console.log(err.message);
    }
  },{timezone: "Asia/Kolkata"});

}

const yearlyScheduler = async (email, { date, month, time }) => {

  var count = 0;
  var emailDocId;

  try {
    const emailDoc = new Email(email);
    const response = await emailDoc.save();
    emailDocId = response._id;
    console.log(emailDocId);
  } catch(err) {
    console.log(err);
  }

  const [hour, minute, second] = time.split(':');

  // '30 30 10 30 12 *'
  cron.schedule(`${second} ${minute} ${hour} ${date} ${month} *`, async () => {
    console.log('running a task every year');
    // Send your mail here!
    try {
      const response = await Mailer(email, emailTemplate(email));
      count += 1;

      if(count == 1) {
        await Email.updateOne({ _id: emailDocId }, {$set: { "count": count, "sendDate": Date.now() }});
        console.log('Updated to sent');
      } else {
        email.sendDate = Date.now();
        email.count = 1;
        await Email.insertMany([email]);

        console.log('Inserted new document');
      }

      // email.sendDate = Date.now();
  
      // await email.save();
    } catch(err) {
      console.log(err.message);
    }
  },{timezone: "Asia/Kolkata"});
}

module.exports = { recurringScheduler, weeklyScheduler, monthlyScheduler, yearlyScheduler};