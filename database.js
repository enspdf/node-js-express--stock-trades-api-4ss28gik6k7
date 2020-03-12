const { connect } = require("mongoose").set("debug", true);

module.exports = async function connectMongo() {
  await connect("mongodb://lean:lean123@ds253428.mlab.com:53428/lean-test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });

  console.log("Connection to database was successful!");
};
