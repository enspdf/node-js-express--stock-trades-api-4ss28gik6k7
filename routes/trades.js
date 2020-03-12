const express = require("express");
const router = express.Router();
const { create, remove, read, readByUser } = require("../controllers/trades");

// Routes related to trades
router
  .route("/")
  .get(read)
  .post(create);

router
  .route("/users/:userId")
  .get(readByUser);

module.exports = router;
