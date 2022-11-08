function tryCatchWrapper(endpointFn) {
  return async (req, res, next) => {
    try {
      await endpointFn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}

function notFoundMessage(req, res, next) {
  return res.status(404).json({ message: "Not found" });
}

module.exports = {
  tryCatchWrapper,
  notFoundMessage,
};
