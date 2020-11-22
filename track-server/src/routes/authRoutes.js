const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = mongoose.model("User");

router.post("/signup", async (req, res) => {
  const { email, password, passwordConfirm } = req.body;

  try {
    const user = User({ email, password, passwordConfirm });
    await user.save();

    const token = jwt.sign({ userId: user._id }, "SECRET_KEY");

    res.send({ token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: "Must provide email and password" });
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(422).send({ error: "Invalid password or email" });
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, "SECRET_KEY");
    res.send({ token });
  } catch (err) {
    console.log(err);
    return res.status(422).send({ error: "Invalid password or email" });
  }
});

module.exports = router;
