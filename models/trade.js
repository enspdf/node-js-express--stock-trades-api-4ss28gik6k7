const mongoose = require("mongoose");
const { Schema } = mongoose;

const TradeSchema = new Schema({
  id: {
    type: Number,
    unique: true
  },
  type: {
    type: String
  },
  user: {
    id: {
      type: Number
    },
    name: {
      type: String
    }
  },
  symbol: {
    type: String
  },
  shares: {
    type: Number
  },
  price: {
    type: Number
  },
  timestamp: {
    type: String
  }
});

module.exports = mongoose.model("Trade", TradeSchema);
