import { gql } from '@apollo/client';


export default gql`
    query ClientsUpdateOneQuery($id: ID!) {
        getClient(id: $id) {
            id
            name
            email
            phone
        }
    }
`;

