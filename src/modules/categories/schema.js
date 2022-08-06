const { gql } = require("apollo-server");

module.exports = gql`
  type Category {
    id: ID!
    name: String!
    img: String!
  }

  extend type Query {
    getCategory(category_id: ID!): Category
    getRestaurantCategories(restaurant_id: ID!): [Category]
  }

  input categoryInput {
    name: String!
    img: String!
    restaurant_id: ID!
  }

  extend type Mutation {
    createCategory(categoryInput: categoryInput): Category!
    deleteCategory(categoryID: ID!): String!
  }
`;
