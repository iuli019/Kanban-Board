const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: { type: String },
  description: { type: String },
  id: { type: Number },
  index: { type: Number },
  indexEdit: { type: Number },
  panelId: { type: String },
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
