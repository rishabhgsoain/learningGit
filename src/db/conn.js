const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://rishabh:rishabh5@test1.zsdbsv5.mongodb.net/test";

const connectToMongo = () => {
  mongoose
    .connect(mongoURI, {
      //   dbName: "BlogsDB",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    //   useCreatendex: true,
    })
    .then(() => {
      console.log("Connected to mongo");
    })
    .catch((err) => console.log(err.message));
};

module.exports = connectToMongo;
