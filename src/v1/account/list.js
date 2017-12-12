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
		packages: customer.subscriptions.data.map(stripeSubscriptionToOutput)
	};
}

function stripeSubscriptionToOutput(subscription) {
	return {
		id: subscription.id,
		plan_id: subscription.plan.id,
		created: subscription.created,
		canceled: subscription.canceled_at,
		ended: subscription.ended_at,
		meta: subscription.metadata,
		status: subscription.status,
	};
}

module.exports = (req, res, next) => {
	req.app.locals.stripe.customers.list({}, (err, customers) => {
		if(err) return next(err);

		res.status(200).send(customers.data.map(stripeCustomerToOutput));
	});
};
