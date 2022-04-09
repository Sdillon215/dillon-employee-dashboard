import { gql } from '@apollo/client';

export const QUERY_DEPARTMENTS = gql`
{
  departments {
    _id
    name
    products {
      _id
      name
      description
      image
      price
      invQuantity
    }
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

export const QUERY_DEP = gql`
query Department($id: ID!) {
  department(_id: $id) {
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
    products {
      _id
      name
    }
  }
}`
;

export const QUERY_PORDERS = gql`
  {
    porders {
    _id
    purchaseDate
    total
  }
}`
;

export const QUERY_SORDERS = gql`
  {
    sorders {
    _id
    saleDate
    total
  }
}
`;

export const QUERY_PRODUCTS = gql`
{
  products {
    _id
    name
    description
    image
    price
    quantity
  }
}
`;
