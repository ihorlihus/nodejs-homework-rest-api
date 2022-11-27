const gravatar = require("gravatar");

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
