import { gql } from '@apollo/client'

export default gql`
    mutation ProjectsUpdateOneMutation($id: ID!, $clientId: ID!, $name: String!, $description: String!, $status: Status!) {
        updateProject(id: $id, clientId: $clientId, name: $name, description: $description, status: $status){
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
    }
`;
