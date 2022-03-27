import { gql } from '@apollo/client';

export const QUERY_DEP_ORDERS = gql`
{
  departments {
    _id
    name
    porders {
      _id
      purchaseDate
      orderTotal
    }
    sorders {
      _id
      saleDate
      saleTotal
    }
  }
}`;

export const QUERY_DEP_PRODUCTS = gql`
{
  departments {
    _id
    name
    products {
      _id
      name
    }
  }
}`;

export const QUERY_PORDERS = gql`
  {
    porders {
    _id
    purchaseDate
    total
  }
}
`;

export const QUERY_SORDERS = gql`
  {
    sorders {
    _id
    saleDate
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
