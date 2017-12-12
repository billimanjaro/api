const stripe = require('../../../lib/stripe');
const error = require('../../../lib/error');

module.exports = (req, res, next) => {
	req.app.locals.stripe.customers.del(req.params.id, (err, result) => {
		if(err) return next(err);

		if(result.deleted) {
			res.status(204).send();
		} else {
			res.status(500).send();
		}
	})
};
