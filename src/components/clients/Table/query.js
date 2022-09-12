import { gql } from '@apollo/client'

export default gql` 
    query ClientsTableFindManyQuery {
        clients {
            id
            name
            email
            phone
        }
    }
`;
