import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const PO_SUBMIT = gql`
mutation PurchaseOrder($departmentId: ID, $orderTotal: Float, $porderItems: [PorderItemsInput]) {
  purchaseOrder(departmentId: $departmentId, orderTotal: $orderTotal, porderItems: $porderItems) {
    _id
    name
    products {
      _id
      name
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