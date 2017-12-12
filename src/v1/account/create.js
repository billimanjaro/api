const stripe = require('../../../lib/stripe');
const error = require('../../../lib/error');

function requestToStripeCustomer(body) {
	return {
		email: body.email,
		description: body.description,
		metadata: body.meta,
	};
}

module.exports = (req, res, next) => {
	const customer = requestToStripeCustomer(req.body);
	req.app.locals.stripe.customers.create(customer, (err, customer) => {
		if(err) return next(err);

		const url = req.originalUrl + '/' + customer.id;
		res.redirect(303, url);
	});
};
