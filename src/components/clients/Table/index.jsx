import Spinner from '../../Spinner';
import Forbidden from '../../Forbidden';
import Link from 'next/link'
import { FaExternalLinkSquareAlt } from 'react-icons/fa';
import { useQuery } from '@apollo/client';
import query from './query';
import Table from 'react-bootstrap/Table';


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
                <Table responsive bordered hover striped>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        { data.clients.map(client => (
                            <tr key={client.id}>
                                <td className='text-center'>
                                    <Link href={`/clients/${encodeURIComponent(client.id)}`}>
                                        <a>
                                            <FaExternalLinkSquareAlt/>
                                        </a>
                                    </Link>
                                </td>
                                <td>{ client.name }</td>
                                <td>{ client.email }</td>
                                <td>{ client.phone }</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (<div className='d-flex justify-content-center mt-5'><p>No clients yet</p></div>)}
        </>
    )
}
