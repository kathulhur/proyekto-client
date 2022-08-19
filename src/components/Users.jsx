import { useQuery } from '@apollo/client'
import UserRow from './UserRow'
import Spinner from './Spinner';
import { GET_USERS } from '../queries/userQueries';
// gql: used to make the query
// useQuery: to use the query in our components and get the data as well as the loading state, errors, etc.



export default function Users() {
    const { loading, error, data } = useQuery(GET_USERS);
    // loading: true or false
    // error: if there is an error
    // data: actual data
    if (loading) return <Spinner/>
    if (error) return <p>Something Went Wrong</p>
    return (
        <>
            { !loading && !error && (
                <table className="table table-hover mt-3">
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Username</td>
                            <td>Password</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        { data.users.map(user => (
                            <UserRow key={user.id} user={user} />
                        ))}
                    </tbody>
                </table>
            )}
        </>
    )
}
