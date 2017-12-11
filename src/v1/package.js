const stripe = require('../../lib/stripe');

function stripePlanToOutput(plan) {
	return {
		id: plan.id,
		name: plan.name,
		meta: plan.metadata,
		trial_duration: plan.trial_period_days
		amount: plan.amount,
		currency: plan.currency,
		interval: plan.interval,
		duration: plan.interval_count,
	};
}

function handleError(err, req, res) {
	console.log(JSON.stringify({ error: err, request_id: req.headers['x-request-id'] }));
	res.status(500).send({
		error: 'API call failed',
		request_id: req.headers['x-request-id']
	});
}

module.exports = app => {
	app.get('/package', (req, res) => {
		stripe.plans.list({}, (err, plans) => {
			if(err) {
				handleError(err, req, res);
				return;
			}

			res.status(200).send(plans.data.map(stripePlanToOutput));
		});
	});

	app.get('/package/:id', (req, res) => {
		stripe.plans.retrieve(req.params.id, (err, plan) => {
			if(err) {
				handleError(err, req, res);
				return;
			}

			res.status(200).send(stripePlanToOutput(plan));
		});
	});
};
