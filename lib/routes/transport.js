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

// ========== ROUTES ==========
router.post('/contactform', (req, res) => {
  const {to, subject, text} = req.body;

  const mailData = {
    from: 'no-reply@asyncdotthen.com',
    to: to,
    subject: subject,
    text: text,
    html: `<b>Hey there! </b>
      <br> There's gonna be a template here with information from the front end!<br/>`,
  };

  res.status(201);
  res.send(mailData);

  transporter.sendMail(mailData, function(err, info) {
    if (err) {
      return console.log(err);
    } else {
      res.status(201);
      res.send({ message: 'Mail Send', message_id: info.messageId });
    }
  });
});

module.exports = router;