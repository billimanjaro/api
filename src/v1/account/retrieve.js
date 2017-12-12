const stripe = require('../../../lib/stripe');
const error = require('../../../lib/error');

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

module.exports = (req, res) => {
	stripe.customers.retrieve(req.params.id, (err, customer) => {
		if(err) {
			error.handleError(err, req, res);
			return;
		}
		res.status(200).send(stripeCustomerToOutput(customer));
	})
};
