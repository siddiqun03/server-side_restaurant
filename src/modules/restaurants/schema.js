const { gql } = require("apollo-server");

module.exports = gql`
  type Restaurant {
    id: ID!
    name: String!
    img: String!
  }

  extend type Query {
    getRestaurants: [Restaurant]
    getRestaurant(restaurantID: ID!): Restaurant
  }

  input restaurantInput {
    name: String!
    img: String!
  }

  extend type Mutation {
    createRestaurant(restaurantInput: restaurantInput): Restaurant!
    deleteRestaurant(restaurantID: ID!): String!
  }
`;
