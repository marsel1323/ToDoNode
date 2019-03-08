const config = require('config');
const mongoose = require('mongoose');

const { options, url } = config.db;

const connect = () => {
	mongoose.connect(url, options)
		.catch(err => console.log(err));
	mongoose.connection
		.on('error', console.log)
		.on('disconnected', connect);
};

module.exports = { connect };
