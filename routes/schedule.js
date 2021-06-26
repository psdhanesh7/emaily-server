const Cron=require('node-cron');
const dat='25';
const tim='12:30:59';

const [hour,min,sec]=tim.split(':');

const secTask=Cron.schedule('*/30 * * * * *', () => {
    console.log('running a task every 30 sec');
  },{timezone: "Asia/Kolkata"});


const weekTask=Cron.schedule(sec+' '+min+' '+hour+' '+'* * Sunday', () => {
    console.log('running a task every sec');
  },{timezone: "Asia/Kolkata"});


const monthTask= Cron.schedule(sec+' '+min+' '+hour+' '+dat+'  * *', () => {
    console.log('running a task every minute');
  },{timezone: "Asia/Kolkata"});


const yearTask=Cron.schedule('30 30 10 30 12 *', () => {
    console.log('running a task every minute');
  },{timezone: "Asia/Kolkata"});



  module.exports={secTask,weekTask,monthTask,yearTask};