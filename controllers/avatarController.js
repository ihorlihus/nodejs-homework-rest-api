const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { nanoid } = require("nanoid");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../tmp"),
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

async function avatarToUserToPublic(req, res, next) {
  const { file } = req;
  const newPath = path.join(
    "public/avatars",
    nanoid() + "-" + req.user.email + "-" + file.filename
  );
  await fs.rename(file.path, newPath);

  Jimp.read(newPath, (err, avatar) => {
    if (err) throw err;
    avatar.resize(250, 250).write(newPath);
  });

  return res.status(201).json({
    data: {
      file,
    },
  });
}

module.exports = {
  upload,
  avatarToUserToPublic,
};
