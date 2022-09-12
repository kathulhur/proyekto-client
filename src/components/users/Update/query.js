import { gql } from '@apollo/client';


export default gql`
    query UsersUpdateOneQuery($id: ID!) {
        user(id: $id) {
            id
            username
            password
            role
            secretCode
            twoFactorAuthEnabled
            twoFactorAuthQrLink
        }
    }
`;
