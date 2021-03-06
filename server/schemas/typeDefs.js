const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Product {
  _id: ID
  name: String
  description: String
  image: String
  price: Float
  invQuantity: Int
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
  name: String
  quantity: Int
  unitPrice: Float
  productTotal: Float
}

input SaleItemsInput {
  productId: ID
  departmentId: ID
  name: String
  quantity: Int
  unitPrice: Float
  productTotal: Float
}

type Sorder {
  _id: ID
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
    addProduct(departmentId: ID!, name: String!, description: String, image: String, price: Float!, invQuantity: Int!): Product
    purchaseOrder(purchaseDate: String, departmentId: ID, orderTotal: Float, porderItems: [PorderItemsInput]): Department
    saleOrder(saleDate: String, departmentId: ID!, saleTotal: Float!, saleItems: [SaleItemsInput]): Department
    addDepartment(name: String!): Department
    updateUser(_id: ID!, dept: String!, username: String!, firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
