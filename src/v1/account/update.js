function requestToStripeCustomer(body) {
	let result = {};
	if(body.email) result.email = body.email;
	if(body.description) result.description = body.description;
	if(body.meta) result.metadata = body.meta;
	return result;
}

module.exports = (req, res, next) => {
	const customer = requestToStripeCustomer(req.body);

	req.app.locals.stripe.customers.update(req.params.id, customer, (err, customer) => {
		if(err) return next(err);

		const url = req.originalUrl;
		res.redirect(303, url);
	});
};
