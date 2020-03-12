const Trade = require("../models/trade");

let create = async function createTrade(req, res) {
  const {
    id,
    type,
    user: { id: userId, name },
    symbol,
    shares,
    price,
    timestamp
  } = req.body;

  const existingTrade = await Trade.findOne({ id });

  if (existingTrade) {
    return res.status(400).send();
  }

  const newTrade = {
    id,
    type,
    user: { id: userId, name },
    symbol,
    shares,
    price,
    timestamp
  };

  const trade = new Trade(newTrade);
  await trade.save(trade);

  return res.status(201).send();
};

let remove = async function deleteTrades(req, res) {
  await Trade.deleteMany({});

  return res.status(200).send();
};

let read = async function getAllTrades(req, res) {
  let trades = [];

  trades = await Trade.find({}, { _id: 0, __v: 0 }, { sort: { id: "asc" } });

  return res.status(200).json(trades);
};

let readByUser = async function getAllTradesByUserId(req, res) {
  const { userId } = req.params;
  const userExists = await Trade.findOne({ "user.id": userId });

  if (!userExists) {
    return res.status(404).send();
  }

  let trades = [];

  trades = await Trade.find({ "user.id": userId }, { _id: 0, __v: 0 }, { sort: { id: "asc" } });

  return res.status(200).json(trades);
}

module.exports = {
  create, remove, read, readByUser
};
