import { gql } from '@apollo/client';


export default gql`
    query ClientsUpdateOneQuery($id: ID!) {
        client(id: $id) {
            id
            name
            email
            phone
        }
    }
`;

