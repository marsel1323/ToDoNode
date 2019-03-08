const config = require('config');
const server = require('./server');
const { connect } = require('./databases');

const { PORT } = config;


const listen = () => {
  server.listen(PORT, () => {
    console.log('Application listening at the port %d', PORT);
  });
};

const createServer = () => {
  listen();
  connect();
  return server;
};

if (!module.parent) {
  listen();
  connect();
}


module.exports = createServer;
