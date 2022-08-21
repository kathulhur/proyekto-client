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
        secretCode
        twoFactorAuthEnabled
    }
  }
`;

const GET_GOOGLE_AUTH_API_KEY = gql`
  query getGoogleAuthApiKey{
    googleAuthApiKey
  }
`;


export { GET_USER, GET_USERS, GET_GOOGLE_AUTH_API_KEY };