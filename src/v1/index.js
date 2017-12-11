const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express.Router();

fs.readdirSync(__dirname)
	.filter(f => f !== 'index.js')
	.forEach(file => require(path.join(__dirname, file))(app));

module.exports = app;
