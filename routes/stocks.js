const express = require("express");
const router = express.Router();
const { find, findPrices } = require("../controllers/stocks");

// Routes related to stocks
router
    .route("/:stockSymbol/trades")
    .get(find);

router
    .route("/:stockSymbol/price")
    .get(findPrices);

module.exports = router;