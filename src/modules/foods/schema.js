const { gql } = require("apollo-server");

module.exports = gql`
  type Food {
    id: ID!
    name: String!
    price: Int!
    img: String!
  }

  extend type Query {
    getFoods: [Food]
    getFood(foodId: ID!): Food
  }

  input foodInput {
    name: String!
    price: Int!
    img: String!
  }

  extend type Mutation {
    createFood(createFood: foodInput): Food!
  }
`;
