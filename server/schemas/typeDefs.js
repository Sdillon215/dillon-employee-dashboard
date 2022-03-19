const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Product {
  _id: ID
  name: String
  description: String
  image: String
  price: Float
  quantity: Int
}

type Department {
  _id: ID
  name: String
  products: [Product]
  porders: [Porder]
}

type Porder {
  _id: ID
  username: String
  purchaseDate: String
  productName: String
  quantity: Int
  unitPrice: Float
  total: Float
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
    department(_id: ID!): [Department]
    departments: [Department]
    products: [Product]
    product(_id: ID!): Product
    porders: [Porder]
  }

  type Mutation {
    addUser(dept: String!, username: String!, firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addProduct(departmentId: ID!, name: String!, description: String, image: String, price: Float!, quantity: Int!): Product
    purchaseOrder(productId: ID!, username: String!, productName: String!, quantity: Int!, unitPrice: Float!, total: Float!): Porder
    addDepartment(name: String!): Department
    updateUser(_id: ID!, dept: String!, username: String!, firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
