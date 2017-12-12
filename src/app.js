const express = require('express');

const app = express.Router();

app.use(require('cors')());
app.use(express.json());
app.use(require('morgan')(process.env.LOG_PROFILE || 'dev'));

['v1'].map(version => app.use('/' + version, require('./' + version)));

module.exports = app;
