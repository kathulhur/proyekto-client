import { gql } from '@apollo/client'

export default gql`
    mutation ProjectsCreateOneMutation($clientId: ID!, $name: String!, $description: String!, $status: Status!) {
        createProject(clientId: $clientId, name: $name, description: $description, status: $status){
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
