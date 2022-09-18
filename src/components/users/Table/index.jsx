import Link from 'next/link';
import { GET_USERS } from './query';
import { useQuery } from '@apollo/client';
import Spinner from '../../Spinner';
import Forbidden from '../../Forbidden';
import { FaExternalLinkSquareAlt } from 'react-icons/fa';
import Table from 'react-bootstrap/Table';

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
                <Table responsive hover bordered striped>
                    <thead>
                        <tr>
                            <th></th>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Password</th>
                        </tr>
                    </thead>
                    <tbody>
                        { data.users.map(user => (
                            <tr key={user.id}>
                                <td className='text-center'>
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
                </Table>
                </>
            ) : (
                <div className='d-flex justify-content-center mt-5'>
                    <p>No projects yet</p>
                </div>
            )}
        </>
    )
}
