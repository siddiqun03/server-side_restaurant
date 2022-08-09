const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    id: ID!
    user_name: String!
    token: String!
    role: String!
    user_phone: String!
  }

  input Register {
    user_name: String!
    user_phone: String!
    password: String!
    confirm_password: String!
  }

  extend type Mutation {
    register(registerInput: Register): User!
    login(user_name: String!, password: String!): User!
  }
`;
