const { Schema, model, SchemaTypes } = require("mongoose");

const contactSchema = new Schema({
  name: {
    type: String,
    // required: [true, "Set name for contact"],
  },
  email: {
    type: String,
    required: [true, "Set email for contact"],
  },
  phone: {
    type: String,
    // required: [true, "Set phone for contact"],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  owner: {
    type: SchemaTypes.ObjectId,
    ref: "user",
  },
});

const Contact = model("contacts", contactSchema);

module.exports = {
  Contact,
};
