import { gql } from '@apollo/client'

export default gql`
  query UsersTableFindManyQuery{
    users{
        id
        username
        role
        twoFactorAuthEnabled
        twoFactorAuthQrLink
    }
  }
`;
