import Spinner from '../../Spinner';
import Forbidden from '../../Forbidden';
import Link from 'next/link'
import { FaExternalLinkSquareAlt } from 'react-icons/fa';
import { useQuery } from '@apollo/client';
import query from './query';



export default function ClientsTable() {
    const { loading, error, data } = useQuery(query);

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
            <Link href='/clients/create'>
                <a className='btn btn-primary mb-3'>Add Client</a>
            </Link>
            { data.clients?.length > 0 ? (
                <div className="container">
                    <table className="table table-hover mt-3">
                        <thead>
                            <tr>
                                <td></td>
                                <td>Name</td>
                                <td>Email</td>
                                <td>Phone</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            { data.clients.map(client => (
                                <tr key={client.id}>
                                    <td>
                                        <div className='d-flex'>
                                            <Link href={`/clients/${encodeURIComponent(client.id)}`}>
                                                <a>
                                                    <FaExternalLinkSquareAlt/>
                                                </a>
                                            </Link>
                                        </div>
                                    </td>
                                    <td>{ client.name }</td>
                                    <td>{ client.email }</td>
                                    <td>{ client.phone }</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (<p>No clients yet</p>)}
        </>
    )
}
