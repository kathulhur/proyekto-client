import { gql } from '@apollo/client'


const GET_PROJECT = gql`
    query getProject($id: ID!) {
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
    }
`;




export { GET_PROJECT };