import { gql } from '@apollo/client';

// the same syntax as with the graphiql


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


export { GET_CLIENT };