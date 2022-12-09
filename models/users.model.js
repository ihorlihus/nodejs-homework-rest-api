const { Schema, model } = require("mongoose");

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
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    // required: [true, "Verify token is required"],
  },
  contacts: [
    {
      type: Schema.Types.ObjectId,
      ref: "contacts",
    },
  ],
  avatarURL: {
    type: String,
    default: null,
  },
});

const User = model("user", usersSchema);

module.exports = {
  User,
};
