import { gql } from '@apollo/client';

const DELETE_CLIENT = gql`
    mutation deleteClient($id: ID!) {
        deleteClient(id: $id) {
            id
            name
            email
            phone
        }
    }

`;


const EDIT_CLIENT = gql`
    mutation editClient($id: ID!, $name: String!, $email: String!, $phone: String!) {
        editClient(id: $id, name: $name, email: $email, phone: $phone) {
            id
            name
            email
            phone
        }
    }
`;


const CREATE_CLIENT = gql`
    mutation createClient($name: String!, $email: String!, $phone: String!) {
        createClient(name: $name, email: $email, phone: $phone){
            id
            name
            email
            phone
        }
    }
`;
export { CREATE_CLIENT, DELETE_CLIENT, EDIT_CLIENT };