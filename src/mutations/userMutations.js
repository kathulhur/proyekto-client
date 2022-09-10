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
    mutation editUser($id: ID!, $username: String, $password: String, $twoFactorAuthEnabled: Boolean, $role: Role, $secretCode: String) {
        editUser(id: $id, username: $username, password: $password, twoFactorAuthEnabled: $twoFactorAuthEnabled, role: $role, secretCode: $secretCode) {
            id
            username
            password
            twoFactorAuthEnabled
            role
            secretCode
        }
    }
`;



const CREATE_USER = gql`
    mutation createUser($username: String!, $password: String!) {
        createUser(username: $username, password: $password) {
            id
            username
            password
            secretCode
            role
            twoFactorAuthEnabled
            twoFactorAuthQrLink

        }
    }
`;


const SIGN_IN = gql`
    mutation signIn($username: String!, $password: String!) {
        signIn(username: $username, password: $password){
            token
            user {
                id
                twoFactorAuthEnabled
            }
        }
    }
`;

const VALIDATE_CODE = gql`
    mutation validateCode($userId: ID!, $code: String!) {
        validateCode(userId: $userId, code: $code ) {
            code
            success
            message
        }
    }
`;



export { DELETE_USER, EDIT_USER , CREATE_USER, SIGN_IN, VALIDATE_CODE};