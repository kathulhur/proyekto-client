import { gql } from '@apollo/client';


export default gql`
    mutation ClientsUpdateOneMutation($id: ID!, $name: String!, $email: String!, $phone: String!) {
        updateClient(id: $id, name: $name, email: $email, phone: $phone) {
            id
            name
            email
            phone
        }
    }
`;
