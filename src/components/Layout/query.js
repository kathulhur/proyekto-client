import { gql } from '@apollo/client'

export default gql`
    query ProjectsTableFindManyQuery {
        projects {
            id
            name
            status
        }
        user: viewer {
            id
            username
            role
        }
    }
`