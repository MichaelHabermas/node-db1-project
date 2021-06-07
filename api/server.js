const express = require('express');
const { logger } = require('../api/accounts/accounts-middleware');
const accountsRouter = require('./accounts/accounts-router');
const server = express();

server.use(express.json());
server.use('/api/accounts', accountsRouter);

server.use(logger);

server.use('*', (req, res) => {
	res.status(404).send(`<p>Oops! Can't find that!</p>`);
});

module.exports = server;
