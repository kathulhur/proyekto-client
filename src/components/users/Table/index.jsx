import Link from 'next/link';
import { GET_USERS } from './query';
import { useQuery } from '@apollo/client';
import Spinner from '../../Spinner';
import Forbidden from '../../Forbidden';
import { FaExternalLinkSquareAlt } from 'react-icons/fa';

export default function UsersTable() {
    const { loading, error, data } = useQuery(GET_USERS);

    if (loading) return <Spinner />;
    if (error) return (
        <>
            { error.graphQLErrors[0]?.extensions.code === "FORBIDDEN" ? 
                <Forbidden/> : // if the error code is forbidden
                <p>Something Went Wrong</p> 
            }
        </>
    )
    return (
        <>
            { data.users?.length > 0 ? (
                <>
                <Link href="/users/create">
                    <a className='btn btn-primary mb-3'>
                        Create User
                    </a>
                </Link>
                <table className="table table-hover mt-3">
                    <thead>
                        <tr>
                            <td></td>
                            <td>ID</td>
                            <td>Username</td>
                            <td>Password</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        { data.users.map(user => (
                            <tr key={user.id}>
                                <td>
                                    <Link href={`/users/${user.id}`}>
                                        <a>
                                            <FaExternalLinkSquareAlt />
                                        </a>
                                    </Link>
                                </td>
                                <td>{ user.id }</td>
                                <td>{ user.username }</td>
                                <td>{ user.password }</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </>
            ) : (
                <div className='d-flex justify-content-center mt-5'>
                    <p>No projects yet</p>
                </div>
            )}
        </>
    )
}
