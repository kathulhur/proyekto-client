import { gql } from '@apollo/client';

// the same syntax as with the graphiql
const GET_CLIENTS = gql` 
    query getClients {
        clients {
            id
            name
            email
            phone
        }
    }
`;

const GET_CLIENT = gql`
    query getClient($id: ID!) {
        client(id: $id) {
            id
            name
            email
            phone
        }
    }
`;


export { GET_CLIENTS, GET_CLIENT };