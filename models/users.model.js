const { Schema, model } = require("mongoose");
const Joi = require("joi");

const schemaValidMailPassJoi = Joi.object({
  password: Joi.string().min(6).required(),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

const usersSchema = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: 6,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
  contacts: [
    {
      type: Schema.Types.Object,
      ref: "contacts",
    },
  ],
});

const User = model("user", usersSchema);

module.exports = {
  User,
  schemaValidMailPassJoi,
};
