const request = require('supertest');
const db = require('../../data/db-config');
const server = require('../server');
const Accounts = require('./accounts-model');

const account1 = { name: 'Betty', budget: 40000 };
const account2 = { name: 'Teddy', budget: 40000 };

test('sanity', () => {
	expect(process.env.DB_ENV).toBe('testing');
});

beforeAll(async () => {
	await db.migrate.rollback();
	await db.migrate.latest();
});
beforeEach(async () => {
	await db('accounts').truncate();
	await db.seed.run();
});
afterAll(async () => {
	await db.destroy();
});

describe('Account Model Functions', () => {
	describe('create account', () => {
		it('adds account to the db', async () => {
			let accounts;
			await Accounts.create(account1);
			accounts = await db('accounts');
			expect(accounts).toHaveLength(14);

			await Accounts.create(account2);
			accounts = await db('accounts');
			expect(accounts).toHaveLength(15);
		});

		it('returns the correct account', async () => {
			const account = await Accounts.create(account1);
			expect(account).toMatchObject({ name: 'Betty', budget: 40000 });
		});
	});

	describe('DELETE account', () => {
		it('deletes account from the db', async () => {
			const [id] = await db('accounts').insert(account1);
			let account = await db('accounts').where({ id }).first();
			expect(account).toBeTruthy();
			await request(server).delete('/api/accounts/' + id);
			account = await db('accounts').where({ id }).first();
			expect(account).toBeFalsy();
		});

		it('respond with te deleted joke', async () => {
			await db('accounts').insert(account1);
			let account = await request(server).delete('/api/accounts/14');
			expect(account.body).toMatchObject(account1);
		});
	});
});

// Message Cooper Jackson, devin-mitchell
