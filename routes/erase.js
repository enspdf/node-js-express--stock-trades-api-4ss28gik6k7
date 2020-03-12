const express = require('express');
const router = express.Router();

const { remove } = require("../controllers/trades");

// Route to delete all trades
router
    .route("/")
    .delete(remove);

module.exports = router;
