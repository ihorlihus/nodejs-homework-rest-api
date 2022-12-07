const nodemailer = require("nodemailer");
const { User } = require("../models/users.model");
const { NotFound, BadRequest } = require("http-errors");

async function sendSignUpEmail({ email, verificationToken }) {
  const url = `http://localhost:3000/api/users/verify/${verificationToken}`;

  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ef6fde338fd3d9",
      pass: "a07332204b725a",
    },
  });

  const msg = {
    from: "yourcontacts@ukr.net",
    to: email,
    subject: "Plese verify your email",
    html: `<a href=${url}>Please open this link</a>`,
    text: "Hello",
  };
  await transport.sendMail(msg);
}

async function verifyEmail(req, res, next) {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (user && !user.verify) {
    user.verificationToken = null;
    user.verify = true;
    await User.findByIdAndUpdate(user._id, user);
    return res.status(200).json({ message: "Verification successful" });
  }
  const err = new NotFound("User not found");
  return res.status(err.status).json(err.message);
}

async function resendEmail(req, res, next) {
  const { email } = req.body;
  if (!email) {
    const err = new BadRequest("missing required field email");
    return res.status(err.status).json(err.message);
  }
  const user = await User.findOne({ email });
  if (user.verify) {
    const err = new BadRequest("Verification has already been passed");
    return res.status(err.status).json(err.message);
  }
  sendSignUpEmail(user);
  return res.status(200).json({
    message: "Verification email sent",
  });
}

module.exports = {
  sendSignUpEmail,
  verifyEmail,
  resendEmail,
};
