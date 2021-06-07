const Accounts = require('./accounts-model');

exports.logger = (req, res, next) => {
	// DO YOUR MAGIC
	// console.log('logger: WORKING');
	console.log(`[${new Date().toLocaleString()}] [${req.method}] ${req.path}`);
	next();
};

exports.checkAccountPayload = (req, res, next) => {
	// DO YOUR MAGIC
	console.log('checkAccountPayload: WORKING');
	Accounts.getAll() // FIX THIS
		.then(thing => {
			if (!thing) {
				next();
			} else {
				next();
			}
		})
		.catch(next);
};

exports.checkAccountNameUnique = (req, res, next) => {
	// DO YOUR MAGIC
	console.log('checkAccountNameUnique: WORKING');

	next();
};

exports.checkAccountId = (req, res, next) => {
	// DO YOUR MAGIC
	// console.log('checkAccountId: WORKING');
	Accounts.getById(req.params.id)
		.then(account => {
			if (!account) {
				res.status(404).json({
					message: 'account not found'
				});
				next();
			} else {
				req.account = account;
				next();
			}
		})
		.catch(next);
};
