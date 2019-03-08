const config = require('config');
const server = require('./server');

const { PORT } = config;


const listen = () => {
  server.listen(PORT, () => {
    console.log('Application listening at the port %d', PORT);
  });
};

const createServer = () => {
  listen();
  return server;
};

if (!module.parent) {
  listen();
}


module.exports = createServer;
