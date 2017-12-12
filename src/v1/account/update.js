const stripe = require('../../../lib/stripe');
const error = require('../../../lib/error');

function requestToStripeCustomer(body) {
	let result = {};
	if(body.email) result.email = body.email;
	if(body.description) result.description = body.description;
	if(body.meta) result.metadata = body.meta;
	return result;
}

module.exports = (req, res) => {
	const customer = requestToStripeCustomer(req.body);
	stripe.customers.update(req.params.id, customer, (err, customer) => {
		if(err) {
			error.handleError(err, req, res);
			return;
		}

		const url = req.originalUrl;
		res.redirect(303, url);
	});
};
