const express = require('express');
const app = express();

app.use(require('./affkey'));
app.use(require('./vigkey'));
app.use(require('./services'));

module.exports = app;
