const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { User } = require("../models/users.model");
const { nanoid } = require("nanoid");
const { Unauthorized } = require("http-errors");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../tmp"),
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

async function avatarToUserToPublic(req, res, next) {
  const { file, user } = req;
  const { originalname } = file;
  const userId = user._id;
  const avatarName = nanoid() + "-" + req.user.email + "-" + originalname;
  const fileName = path.join(__dirname, "../public/avatars", avatarName);
  try {
    console.log(file.path);
    console.log(fileName);
    await fs.rename(file.path, fileName);

    Jimp.read(fileName, (err, avatar) => {
      if (err) throw err;
      avatar.resize(250, 250).write(fileName);
    });

    const userWithNewAvatar = await User.findByIdAndUpdate(
      userId,
      {
        avatarURL: "/public/avatars/" + avatarName,
      },
      { new: true }
    );

    console.log(userWithNewAvatar.avatarURL);
    return res.status(201).json({ avatarURL: userWithNewAvatar.avatarURL });
  } catch (error) {
    await fs.unlink(file.path);
    console.log(error.message);
    const err = new Unauthorized("Not authorized");
    return res.status(err.status).json(err.message);
  }
}

module.exports = {
  upload,
  avatarToUserToPublic,
};
