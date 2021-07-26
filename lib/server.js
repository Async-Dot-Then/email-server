'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
// const nodemailer = require('nodemailer');

// ========== MIDDLEWARE =========
const give404 = require('./middleware/404.js');

// ========== SETUP ===========
let app = express();
// const route = express.Router();
const mailRouter = require('./routes/transport.js');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// app.use(express.urlencoded());

// ========== START SERVER ==========
const startServer = (port) => {
  app.listen(port, () => {console.log(`server is listening on port ${port}`);});
};

// ========== HOME ROUTE ==========
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the EMAIL SERVER</h1>');
});

// ========== STUFF TO MODULARIZE WHEN IT WORKS ===========
app.use('/', mailRouter);


// ========== IF NOTHING WORKS ==========
app.use('*', give404);

// ========== EXPORTS ==========
module.exports = {
  server: app,
  start: startServer,
};