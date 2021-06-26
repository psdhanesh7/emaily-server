const cron = require('node-cron');
const Mailer = require('../../services/Mailer');
const emailTemplate = require('../../services/emailTemplates/emailTemplate');


const recurringScheduler = (email, timeGap) => {
  cron.schedule(`*/${timeGap} * * * * *`, async () => {
    console.log('running a task every 30 sec');
    // Send your email here!

  }, { timezone: "Asia/Kolkata" });
}

const weeklyScheduler = (email, { day, time }) => {

  const [hour, minute, second] = time.split(':');
  // sec+' '+min+' '+hour+' '+'* * Sunday'
  cron.schedule(`${second} ${minute} ${hour} * * ${day}`, async () => {
    console.log('running a task every week');

    try {
      const response = await Mailer(email, emailTemplate(email));
      email.sendDate = Date.now();
  
      email.save();
    } catch(err) {
      console.log(err.message);
    }
  }, { timezone: "Asia/Kolkata" });
  
}

const monthlyScheduler = (email, { date, time }) => {
  const [hour, minute, second] = time.split(':');

  // sec+' '+min+' '+hour+' '+dat+'  * *'
  cron.schedule(`${second} ${minute} ${hour} ${date} * *`, async () => {
    console.log('running a task every minute');
    // Send your email here!
    try {
      const response = await Mailer(email, emailTemplate(email));
      email.sendDate = Date.now();
  
      email.save();
    } catch(err) {
      console.log(err.message);
    }
  },{timezone: "Asia/Kolkata"});

}

const yearlyScheduler = (email, { date, month, time }) => {
  const [hour, minute, second] = time.split(':');

  // '30 30 10 30 12 *'
  cron.schedule(`${second} ${minute} ${hour} ${date} ${month} *`, async () => {
    console.log('running a task every year');
    // Send your mail here!
    try {
      const response = await Mailer(email, emailTemplate(email));
      email.sendDate = Date.now();
  
      email.save();
    } catch(err) {
      console.log(err.message);
    }
  },{timezone: "Asia/Kolkata"});
}

module.exports = { recurringScheduler, weeklyScheduler, monthlyScheduler, yearlyScheduler};