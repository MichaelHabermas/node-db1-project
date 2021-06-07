const router = require('express').Router();
const { checkAccountPayload, checkAccountNameUnique, checkAccountId } = require('./accounts-middleware');

const Accounts = require('./accounts-model');

router.get('/', (req, res, next) => {
	// DO YOUR MAGIC
	Accounts.getAll()
		.then(accounts => {
			// console.log('ACCOUNTS: ', accounts);
			res.status(200).json(accounts);
		})
		.catch(next);
});

router.get('/:id', checkAccountId, (req, res, next) => {
	// DO YOUR MAGIC
	Accounts.getById(req.params.id)
		.then(account => {
			// console.log('ACCOUNT: ', account);
			res.status(200).json(account);
		})
		.catch(next);
});

router.post('/', checkAccountPayload, (req, res, next) => {
	// DO YOUR MAGIC
});

router.put('/:id', checkAccountPayload, (req, res, next) => {
	// DO YOUR MAGIC
});

router.delete('/:id', (req, res, next) => {
	// DO YOUR MAGIC
});

// eslint-disable-line
router.use((err, req, res, next) => {
	// DO YOUR MAGIC
	console.log('Err handling middleware kicking in!', err.message);
	res.status(err.status || 500).json({
		custom: 'Strange things are afoot at the Circle K',
		message: err.message,
		stack: err.message
	});
});

module.exports = router;
