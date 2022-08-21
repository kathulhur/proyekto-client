import { gql } from '@apollo/client';

const DELETE_PROJECT = gql`
    mutation deleteProject($id: ID!) {
        deleteProject(id: $id) {
            id
        }
    }

`;


const CREATE_PROJECT = gql`
    mutation createProject($clientId: ID!, $name: String!, $description: String!, $status: Status!) {
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


const EDIT_PROJECT = gql`
    mutation editProject($id: ID!, $clientId: ID, $name: String, $description: String, $status: Status) {
        editProject(id: $id, clientId: $clientId, name: $name, description: $description, status: $status){
            id
            name
            description
            status
            client {
                id
                name
                email
                phone
            }   
        }
    }
`;

export { CREATE_PROJECT, DELETE_PROJECT, EDIT_PROJECT };