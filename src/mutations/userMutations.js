import { gql } from '@apollo/client';


const DELETE_USER = gql`
    mutation deleteUser($id: ID!) {
        deleteUser(id: $id) {
            id
            username
            password
        }
    }
`;


const EDIT_USER = gql`
    mutation editUser($id: ID!, $username: String, $password: String, $twoFactorAuthEnabled: Boolean) {
        editUser(id: $id, username: $username, password: $password, twoFactorAuthEnabled: $twoFactorAuthEnabled) {
            id
            username
            password
            twoFactorAuthEnabled
        }
    }
`;



const CREATE_USER = gql`
    mutation createUser($username: String!, $password: String!, $secretCode: String!) {
        createUser(username: $username, password: $password, secretCode: $secretCode){
            id
            username
            password
            secretCode
        }
    }
`;


const SIGN_IN = gql`
    mutation signIn($username: String!, $password: String!) {
        signIn(username: $username, password: $password){
            token
            user {
                twoFactorAuthEnabled
                secretCode
            }
        }
    }
`;


const SIGN_UP = gql`
    mutation signUp($username: String!, $password: String!, $secretCode: String!) {
        signUp(username: $username, password: $password, secretCode: $secretCode){
            token
            user {
                secretCode
            }
        }
    }
`;


export { DELETE_USER, EDIT_USER , CREATE_USER, SIGN_IN, SIGN_UP };