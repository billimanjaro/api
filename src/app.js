const express = require('express');

const app = express.Router();

app.use(require('cors')());

['v1'].map(version => app.use('/' + version, require('./' + version)));

module.exports = app;
