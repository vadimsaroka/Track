const express = require("express");
const mongoose = require("mongoose");
const { restart } = require("nodemon");

const requireAuth = require("../middlewares/requireAuth");
const Track = mongoose.model("Track");

const router = express.Router();

router.use(requireAuth);

router.get("/tracks", async (req, res) => {
  const tracks = await Track.find({ userId: req.user._id });

  res.send(tracks);
});

router.post("/tracks", async (req, res) => {
  const { name, locations } = req.body;

  if (!name || !locations) {
    return res
      .status(422)
      .send({ error: "You must provid a name and locations" });
  }

  try {
    const track = new Track({ name, locations, userId: req.user._id });
    await track.save();
    res.send(track);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

router.delete("/tracks/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(422).send({ error: "You must provid a track id" });
  }

  try {
    const trackToDelete = await Track.findById(id);

    if (!trackToDelete) {
      return res
        .status(404)
        .send({ status: "fail", data: "No document was found with that ID" });
    }

    if (JSON.stringify(req.user._id) === JSON.stringify(trackToDelete.userId)) {
      try {
        await Track.findByIdAndDelete(id);
        return res.status(200).send({ status: "success", data: id });
      } catch (err) {
        console.error(err);
      }
    } else {
      return res.status(403).send({
        status: "error",
        data: "You do not have permission to perform this action",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
