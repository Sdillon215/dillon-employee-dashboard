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
