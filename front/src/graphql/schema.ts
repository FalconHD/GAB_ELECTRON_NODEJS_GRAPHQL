import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query Query {
    Users {
      name
      id
      email
      phone
      cin
      licenseType
      role
      score
    }
  }
`;

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      user {
        code
        visa
        name
        id
        balance
        createdAt
      }
    }
  }
`;
