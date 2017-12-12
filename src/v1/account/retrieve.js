function stripeCustomerToOutput(customer) {
	return {
		id: customer.id,
		balance: customer.account_balance,
		currency: customer.currency,
		created: customer.created,
		delinquent: customer.delinquent,
		email: customer.email,
		meta: customer.metadata,
		description: customer.description,
	};
}

module.exports = (req, res, next) => {
	req.app.locals.stripe.customers.retrieve(req.params.id, (err, customer) => {
		if(err) return next(err);

		res.status(200).send(stripeCustomerToOutput(customer));
	})
};
