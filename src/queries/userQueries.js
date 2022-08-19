import { gql } from '@apollo/client'


const GET_USERS = gql`
  query getUsers{
    users{
        id
        username
        password
    }
  }
`;

const GET_USER = gql`
  query getUser($id: ID!){
    user(id: $id){
        id
        username
        password
    }
  }
`;




export { GET_USER, GET_USERS };