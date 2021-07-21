'use strict';

const express = require('express');
const cors = require('cors');

let app = express();

app.use(cors());
app.use(express.json());

const startServer = (port) => {
  app.listen(port, () => {console.log(`server is up on port ${port}`);});
};

app.get('/', (req, res) => {
  res.send('<h1>Welcome to the EMAIL SERVER</h1>');
});

module.exports = {
  server: app,
  start: startServer,
};