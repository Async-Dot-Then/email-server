'use strict';

// ========== REQUIREMENTS ==========
const express = require('express');
const nodemailer = require('nodemailer');

// ========== SETUP ==========
const router = express.Router();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_TO_EMAIL,
    pass: process.env.SMTP_TO_PASSWORD,
  },
});

// const mailData = {
//   from: 'madison@asyncdotthen.com',  // sender address
//   to: 'mnstehle3@gmail.com',   // list of receivers
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!',
//   html: `<b>Hey there! </b>
//            <br> This is our first message sent with Nodemailer<br/>`,
// };


router.post('/text', (req, res) => {
  console.log('HI FROM POST ROUTE');
  
  const {to, subject, text} = req.body;

  const mailData = {
    from: 'mnstehle3@gmail.com',
    to: to,
    subject: subject,
    text: text,
    html: `<b>Hey there! </b>
      <br> This is our first message sent with Nodemailer<br/>`,
  };

  res.status(201);
  res.send(mailData);

  transporter.sendMail(mailData, function(err, info) {
    if (err) {
      return console.log(err);
    } else {
      res.status(201);
      res.send({ message: 'Mail Send', message_id: info.messageId });
      // return console.log(info);
    }
  });
});

// router.get('/text', (req, res) => {
//   res.send('<h1>TEXT STUFF PLZ</h1>');
// });

module.exports = router;