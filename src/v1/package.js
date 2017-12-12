const stripe = require('../../lib/stripe');
const error = require('../../lib/error');

function stripePlanToOutput(plan) {
	return {
		id: plan.id,
		name: plan.name,
		meta: plan.metadata,
		trial_duration: plan.trial_period_days,
		amount: plan.amount,
		currency: plan.currency,
		interval: plan.interval,
		duration: plan.interval_count,
	};
}

module.exports = app => {
	app.get('/package', (req, res, next) => {
		req.app.locals.stripe.plans.list({}, (err, plans) => {
			if(err) return next(err);

			res.status(200).send(plans.data.map(stripePlanToOutput));
		});
	});

	app.get('/package/:id', (req, res, next) => {
		req.app.locals.stripe.plans.retrieve(req.params.id, (err, plan) => {
			if(err) return next(err);

			res.status(200).send(stripePlanToOutput(plan));
		});
	});
};
