const mongoose = require('mongoose');

const { Schema } = mongoose;

// status
//   0      open
//   1      closed/done
//   2
const TaskSchema = new Schema({
  userId: Schema.Types.ObjectId,
  title: String,
  status: Number,
}, {
  timestamps: true,
});


module.exports = mongoose.model('Task', TaskSchema);
