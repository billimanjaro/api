const stripe = require('../../../lib/stripe');
const error = require('../../../lib/error');

module.exports = (req, res) => {
	stripe.customers.del(req.params.id, (err, result) => {
		if(err) {
			error.handleError(err, req, res);
			return;
		}
		if(result.deleted) {
			res.status(204).send();
		} else {
			res.status(500).send();
		}
	})
};
