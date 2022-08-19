import { FaTrash } from 'react-icons/fa';
import { FaPen } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from '../../mutations/clientMutations'
import { GET_CLIENTS } from '../../queries/clientQueries';
import { GET_PROJECTS } from '../../queries/projectQueries';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function ClientRow({ client }) {

    const location = useLocation();
    const [ deleteClient ] = useMutation(DELETE_CLIENT, {
        variables: { id: client.id },
        refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }]
    });

    return (
        <tr>
            <td>{ client.name }</td>
            <td>{ client.email }</td>
            <td>{ client.phone }</td>
            <td>
                <Link to={location.pathname + "/" + client.id + '/edit'} className="btn btn-warning btn-sm me-2">
                    <FaPen/>
                </Link>
                <button className="btn btn-danger btn-sm" onClick={deleteClient}>
                    <FaTrash />
                </button>
            </td>
        </tr>
    )
}
