import { gql } from '@apollo/client';

export default gql`
    mutation UsersUpdateOneMutation($id: ID!, $username: String, $password: String, $twoFactorAuthEnabled: Boolean, $role: Role) {
        updateUser(id: $id, username: $username, password: $password, twoFactorAuthEnabled: $twoFactorAuthEnabled, role: $role) {
            id
            username
            password
            twoFactorAuthEnabled
            role
            secretCode
        }
    }
`;
