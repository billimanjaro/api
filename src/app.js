const express = require('express');

const app = express();

app.locals.stripe = require('../lib/stripe');

app.use(require('cors')());
app.use(express.json());

['v1'].map(version => app.use('/' + version, require('./' + version)));

app.use((err, req, res, next) => {
	console.log(JSON.stringify({ error: err, request_id: req.headers['x-request-id'] }));
	res.status(500).send({
		error: 'API call failed',
		request_id: req.headers['x-request-id']
	});
});

module.exports = app;
