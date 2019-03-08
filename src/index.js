const config = require('config');
const server = require('./server');

const { PORT } = config;

server.listen(PORT, () => {
	console.log('Application listening at the port %d', PORT);
});
