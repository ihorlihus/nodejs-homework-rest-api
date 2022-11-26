const gravatar = require("gravatar");
// const multer = require("multer");
// const path = require("path");
// const { nanoid } = require("nanoid");
// // const fs = require("fs/promises");

// const storage = multer.diskStorage({
//   dest: path.join(__dirname, "../tmp"),
//   filename: function (req, file, cb) {
//     cb(null, nanoid() + file.originalname);
//   },
// });

// const upload = multer({
//   storage,
//   // can set limits
//   limits: {
//     // fileSize: 1, // in bytes
//   },
// });

async function avatarForTmp(req, res, next) {
  const { email } = req.user;
  const avatar = gravatar.url(
    email,
    {
      s: "200",
      r: "pg",
      d: "retro",
    },
    { format: "png" }
  );
  req.user.avatarURL = avatar;
  return next();
}

module.exports = {
  avatarForTmp,
};
