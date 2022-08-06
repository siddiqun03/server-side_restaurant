const { gql } = require("apollo-server");

module.exports = gql`
  type Food {
    id: ID!
    name: String!
    price: Int!
    img: String!
  }

  extend type Query {
    getFood(foodID: ID!): Food
    getCategoryFoods(category_id: ID!): [Food]
  }

  input foodInput {
    name: String!
    price: Int!
    img: String!
    category_id: ID!
  }

  extend type Mutation {
    createFood(createFood: foodInput): Food!
    deleteFood(foodID: ID!): String!
  }
`;
