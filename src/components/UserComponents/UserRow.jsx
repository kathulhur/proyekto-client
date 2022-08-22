import { FaTrash } from 'react-icons/fa';
import { FaPen } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { GET_USERS } from '../../queries/userQueries';
import { DELETE_USER } from '../../mutations/userMutations';


export default function UserRow({ user }) {

    const [ deleteUser ] = useMutation(DELETE_USER, {
        variables: { id: user.id },
        refetchQueries: [{ query: GET_USERS }]
        // update(cache, { data: { deleteUser }}) { // this produces a warning
        //     const { users } = cache.readQuery({ query: GET_USERS });
        //     cache.writeQuery({
        //         query: GET_USERS,
        //         data: { users: users.filter(user => user.id !== deleteUser.id)},
        //     }); 
        // }
    });

    return (
        <tr>
            <td>{ user.id }</td>
            <td>{ user.username }</td>
            <td>{ user.password }</td>
            <td>
                <a href={`/users/${user.id}/edit`} className="btn btn-warning me-2">
                    <FaPen />
                </a>
                <button className="btn btn-danger btn-sm" onClick={deleteUser}>
                    <FaTrash />
                </button>
            </td>
        </tr>
    )
}
