module.exports = {
	handleError: function handleError(err, req, res) {
		console.log(JSON.stringify({ error: err, request_id: req.headers['x-request-id'] }));
		res.status(500).send({
			error: 'API call failed',
			request_id: req.headers['x-request-id']
		});
	}
};
