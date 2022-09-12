import { gql } from '@apollo/client'

export default gql`
    query ProjectsCreateOneQuery {
        clients {
            id
            name
            email
            phone
        }
    }
`;