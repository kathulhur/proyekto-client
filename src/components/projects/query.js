import { gql } from '@apollo/client'

export default gql`
    query ProjectsTableFindManyQuery {
        projects {
            id
            name
            description
            status
            client {
                id
                name
            }
        }
    }
`