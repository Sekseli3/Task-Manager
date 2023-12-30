const mongoose = require('mongoose');

mongoose.set('strictQuery', false)
mongoose.connect(url)

const taskSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});
const Task = mongoose.model('Task', taskSchema)


module.exports = Task;