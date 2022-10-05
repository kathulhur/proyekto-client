import { gql } from '@apollo/client'

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

export { SIGN_IN, VALIDATE_CODE };