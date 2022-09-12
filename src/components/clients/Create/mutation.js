const { gql } = require('@apollo/client');

export default gql`
    mutation ClientsCreateOneMutation ($name: String!, $email: String!, $phone: String!) {
        createClient(name: $name, email: $email, phone: $phone){
            id
            name
            email
            phone
        }
    }
`;