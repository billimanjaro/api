const express = require('express');
const fs = require('fs');

const app = express.Router();

fs.readdirSync('./')
	.filter(f => f !== 'index.js')
	.forEach(file => require('./' + file)(app));

module.exports = app;
