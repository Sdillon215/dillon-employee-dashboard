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
  sorders: [Sorder]
}

type PorderItems {
  _id: ID
  productId: ID
  departmentId: ID
  name: String
  quantity: Int
  unitPrice: Float
  productTotal: Float
}

type Porder {
  _id: ID
  purchaseDate: String
  departmentId: ID
  orderTotal: Float
  porderItems: [PorderItems]
}

input PorderItemsInput {
  productId: ID
  departmentId: ID
  name: String
  quantity: Int
  unitPrice: Float
  productTotal: Float
}

type SaleItems {
  _id: ID
  productId: ID
  departmentId: ID
  productName: String
  quantity: Int
  unitPrice: Float
  productTotal: Float
}

input SaleItemsInput {
  _id: ID
  productId: ID
  departmentId: ID
  productName: String
  quantity: Int
  unitPrice: Float
  productTotal: Float
}

type Sorder {
  _id: ID
  username: String
  saleDate: String
  departmentId: ID
  saleTotal: Float
  saleItems: [SaleItems]
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
    department(_id: ID!): Department
    departments: [Department]
    products: [Product]
    product(_id: ID!): Product
    porders: [Porder]
    sorders: [Sorder]
  }

  type Mutation {
    addUser(dept: String!, username: String!, firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addProduct(departmentId: ID!, name: String!, description: String, image: String, price: Float!, quantity: Int!): Product
    purchaseOrder(departmentId: ID, orderTotal: Float, porderItems: [PorderItemsInput]): Porder
    saleOrder(username: String!, saleDate: String, departmentId: ID!, saleTotal: Float!, saleItems: [SaleItemsInput]): Sorder
    addDepartment(name: String!): Department
    updateUser(_id: ID!, dept: String!, username: String!, firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
