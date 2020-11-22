const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ error: "You must be logged in." });
  }

  const token = authorization.replace("Bearer ", "");

  jwt.verify(token, "SECRET_KEY", async (err, paylod) => {
    if (err) {
      return res.status(401).send({ error: "You must be logged in." });
    }

    const { userId } = paylod;

    const user = await User.findById(userId);
    req.user = user;
    next();
  });
};
