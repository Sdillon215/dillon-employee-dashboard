const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Department {
  _id: ID
  name: String
}

type Product {
  _id: ID
  name: String
  description: String
  image: String
  price: Float
  quantity: Int
  department: Department
}

type Porder {
  username: String
  purchaseDate: String
  products: [Product]
}

type Sorder {
  username: String
  saleDate: String
  products: [Product]
}

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

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: [User]
    department: [Department]
    products: [Product]
    product(_id: ID!): Product
  }

  type Mutation {
    addUser(dept: String!, username: String!, firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addProduct(name: String!, description: String, image: String, price: Float!, quantity: Int!, department: ID!): Product
    addDepartment(name: String!): Department
    updateUser(_id: ID!, dept: String!, username: String!, firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
