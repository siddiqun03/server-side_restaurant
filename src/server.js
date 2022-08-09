const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const cors = require("cors");
const modules = require("./modules");
const mongoDb = require("./utils/mongoDb");

const server = new ApolloServer({
  modules,
  context: ({ req }) => ({ req }),
});

mongoose
  .connect(mongoDb.dataBase)
  .then(() => {
    cors(
      cors({
        origin: "*",
      })
    );
    console.log("MongoDb Connected!");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server is running at ${res.url}`);
  });
