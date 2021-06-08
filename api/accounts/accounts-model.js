const db = require('../../data/db-config');

const getAll = () => {
	return db('accounts');
};

const getById = id => {
	return db('accounts').where({ id }).first();
};

async function create({ name, budget }) {
	const [id] = await db('accounts').insert({ name, budget });
	return getById(id);
}
// - OR -
// const create = ({ name, budget }) => {
// 	db('accounts')
// 		.insert({ name, budget })
// 		.then(([id]) => {
// 			return getById(id);
// 		});
// };

function updateById(id, { name, budget }) {
	return db('accounts')
		.where('id', id)
		.update({ name, budget })
		.then(() => {
			return getById(id);
		});
}
// - OR -
// async function updateById(id, { name, budget }) {
// 	await db('accounts').where('id', id).update({ name, budget });
// 	return getById(id);
// }

async function deleteById(id) {
	const postToDelete = await getById(id);
	await db('accounts').where({ id }).del();
	return postToDelete;
}

module.exports = {
	getAll,
	getById,
	create,
	updateById,
	deleteById
};
