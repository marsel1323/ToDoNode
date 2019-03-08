const mongoose = require('mongoose');

const { Schema } = mongoose;


const TaskSchema = new Schema({
	title: String,
	status: Number,
}, {
	timestamps: true,
});


module.exports = mongoose.model('Task', TaskSchema);
