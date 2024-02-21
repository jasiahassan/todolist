const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    enum: ["office", "home", "other"],
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
  },
  dueDate: {
    type: Date,
  },
});
const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
