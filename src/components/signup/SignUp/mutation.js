import { gql } from '@apollo/client';

export default gql`
    mutation UsersCreateOneMutation($username: String!, $password: String!) {
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