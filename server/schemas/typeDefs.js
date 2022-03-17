const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    dept: String
    username: String
    firstName: String
    lastName: String
    email: String
    porders: [Porder]
    sorders: [Sorder]
  }

  type Product {
    _id: ID
    name: String
    description: String
    image: String
    price: Number
    quantity: Number
    department: Department
  }

  

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: [User]
  }

  type Mutation {
    addUser(dept: String!, username: String!, firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateUser(_id: ID!, dept: String!, username: String!, firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
