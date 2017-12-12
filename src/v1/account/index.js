module.exports = app => {
	app.post('/account', require('./create'));
	app.get('/account', require('./list'));
	app.get('/account/:id', require('./retrieve'));
	app.put('/account/:id', require('./update'));
	app.delete('./account/:id', require('./delete'));
};
