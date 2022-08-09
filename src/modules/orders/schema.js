const { gql } = require("apollo-server");

module.exports = gql`
  type order {
    food_name: String!
    food_price: Int!
    food_count: Int!
  }

  input Order {
    foodName: String!
    foodPrice: Int!
    foodCount: Int!
  }

  type aboutOrders {
    user_name: String!
    phone_number: Int!
    orders: [order]
  }

  extend type Query {
    getOrders: [aboutOrders]
  }

  extend type Mutation {
    addOrder(orderInput: [Order]): aboutOrders
  }
`;
