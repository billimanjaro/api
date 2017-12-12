const stripe = require('../../../lib/stripe');
const error = require('../../../lib/error');

function requestToStripeCustomer(body) {
	return {
		email: body.email,
		description: body.description,
		metadata: body.meta,
	};
}

module.exports = (req, res) => {
	const customer = requestToStripeCustomer(req.body);
	stripe.customers.create(customer, (err, customer) => {
		if(err) {
			error.handleError(err, req, res);
			return;
		}

		const url = req.originalUrl + '/' + customer.id;
		res.redirect(303, url);
	});
};
