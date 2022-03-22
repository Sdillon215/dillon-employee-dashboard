import { gql } from '@apollo/client';

export const QUERY_ALL_DEPARTMENTS = gql`
{
  departments {
  _id
  name
  porders {
    _id
    username
    purchaseDate
    productName
    quantity
    unitPrice
    total
  }
}}
`;

export const QUERY_PORDERS = gql`
  {
    porders {
    _id
    purchaseDate
    total
  }
}
`;

export const QUERY_ALL_PRODUCTS = gql`
  {
    products {
      _id
      name
      description
      price
      quantity
      category {
        name
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          price
          quantity
          image
        }
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;
