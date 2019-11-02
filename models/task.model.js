const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let TaskSchema = new Schema({
  description: { type: String, required: true, min: 10, max: 1000 },
  state: { type: String, required: true },
  type: { type: String, required: true },
  file: { data: Buffer, contentType: String }
});

// Export the model
module.exports = mongoose.model("Task", TaskSchema);
