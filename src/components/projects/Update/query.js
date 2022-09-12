import { gql } from '@apollo/client'


export default gql`
    query ProjectsUpdateOneQuery($id: ID!) {
        project(id: $id) {
            id
            name
            description
            status
            clientId
            client {
                id
                name
                email
                phone
            }
        }
        clients {
            id
            name
            email
            phone
        }
    }
`;
