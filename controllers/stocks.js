const Trade = require("../models/trade");
const moment = require("moment");

let find = async function findStockCriteria(req, res) {
    const { stockSymbol } = req.params;
    const { type, start, end } = req.query;

    const symbolExists = await Trade.findOne({ "symbol": stockSymbol });

    if (!symbolExists) {
        return res.status(404).send();
    }

    const startDateFormatted = moment(start).startOf("day").format("YYYY-MM-DD HH:mm:ss");
    const endDateFormatted = moment(end).endOf("day").format("YYYY-MM-DD HH:mm:ss");

    let trades = [];

    trades = await Trade.find({ symbol: stockSymbol, type, timestamp: { "$gte": startDateFormatted, "$lte": endDateFormatted } }, { _id: 0, __v: 0 }, { sort: { id: "asc" } });

    return res.status(200).json(trades)
};

let findPrices = async function findStockPricesCriteria(req, res) {
    const { stockSymbol } = req.params;
    const { start, end } = req.query;

    const symbolExists = await Trade.findOne({ "symbol": stockSymbol });

    if (!symbolExists) {
        return res.status(404).send();
    }

    const startDateFormatted = moment(start).startOf("day").format("YYYY-MM-DD HH:mm:ss");
    const endDateFormatted = moment(end).endOf("day").format("YYYY-MM-DD HH:mm:ss");

    let trades = [];
    trades = await Trade.find({ symbol: stockSymbol, timestamp: { "$gte": startDateFormatted, "$lte": endDateFormatted } }, { price: 1, _id: 0 });

    if (Array.isArray(trades) && trades.length > 0) {
        return res.status(200).json({
            symbol: stockSymbol,
            highest: Math.max(...iterateTrades(trades)),
            lowest: Math.min(...iterateTrades(trades))
        });
    } else {
        return res.status(200).json({
            message: "There are no trades in the given date range"
        });
    }
};

let iterateTrades = trades => (trades.map(trade => trade.price));

module.exports = {
    find, findPrices
}