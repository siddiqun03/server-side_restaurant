const { gql } = require("apollo-server");

module.exports = gql`
  type category {
    id: ID!
    name: String!
    img: String!
    product_id: [ID]
  }

  extend type Query {
    getCategories: [category]
  }

  input categoryInput {
    name: String!
    img: String!
    product_id: [ID]
  }

  extend type Mutation {
    createCategory(categoryInput: categoryInput): category!
    # deleteCategory(categoryID: ID!): String!
  }
`;
