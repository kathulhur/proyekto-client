import { FaEnvelope, FaPhone, FaIdBadge } from 'react-icons/fa';
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import Forbidden from '../../../src/components/Forbidden';
import Spinner from '../../../src/components/Spinner';
import Header from '../../../src/components/Header';

const query = gql`
    query ClientPageQuery($id: ID!) {
        client(id: $id) {
            id
            name
            email
            phone
        }
    }
`;  

export default function ClientPage() {
    const router = useRouter();
    const { clientId } = router.query;

    const { data, loading, error } = useQuery(query, {
        variables: {
            id: clientId
        }
    });

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
            <Header />
            <h5 className="mt-5">Client Information</h5>
            <ul className="list-group">
                <li className="list-group-item">
                    <FaIdBadge className='icon'/> {data.client?.name}
                </li>
                <li className="list-group-item">
                    <FaEnvelope className='icon'/> {data.client?.email}
                </li>
                <li className="list-group-item">
                    <FaPhone className='icon'/> {data.client?.phone}
                </li>
            </ul>
        </>
    )
}
