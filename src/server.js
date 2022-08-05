const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const modules = require("./modules");
const mongoDb = require("./utils/mongoDb");

const server = new ApolloServer({
  modules,
});

mongoose
  .connect(mongoDb.dataBase)
  .then(() => {
    console.log("MongoDb Connected!");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server is running at ${res.url}`);
  });
