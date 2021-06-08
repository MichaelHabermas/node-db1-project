const router = require('express').Router();
const { checkAccountPayload, checkAccountNameUnique, checkAccountId } = require('./accounts-middleware');

const Accounts = require('./accounts-model');

router.get('/', (req, res, next) => {
	Accounts.getAll()
		.then(accounts => {
			res.status(200).json(accounts);
		})
		.catch(next);
});

router.get('/:id', checkAccountId, (req, res, next) => {
	Accounts.getById(req.params.id)
		.then(account => {
			res.status(200).json(account);
		})
		.catch(next);
});

router.post('/', checkAccountNameUnique, checkAccountPayload, (req, res, next) => {
	Accounts.create({ name: req.name, budget: req.body.budget })
		.then(account => {
			res.status(201).json(account);
		})
		.catch(next);
});

router.put('/:id', checkAccountId, checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
	Accounts.updateById(req.params.id, req.body)
		.then(updatedAccount => {
			res.json(updatedAccount);
		})
		.catch(next);

	// try {
	// 	const data = await Accounts.updateById(req.params.id, req.body);
	// 	res.json(data);
	// } catch (err) {
	// 	next(err);
	// }
});

router.delete('/:id', checkAccountId, (req, res, next) => {
	Accounts.deleteById(req.params.id)
		.then(deletedPost => {
			res.status(200).json(deletedPost);
		})
		.catch(next);
});

// eslint-disable-line
router.use((err, req, res, next) => {
	// console.log('Err handling middleware kicking in!', err.message);
	res.status(err.status || 500).json({
		custom: 'Strange things are afoot at the Circle K',
		message: err.message,
		stack: err.message
	});
});

module.exports = router;
