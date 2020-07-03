const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const panelSchema = new Schema({
  show: { type: Boolean },
  id: { type: String },
  title: { type: String },
});

const Panel = mongoose.model("Panel", panelSchema);
module.exports = Panel;
