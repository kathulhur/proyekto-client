import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_PROJECT } from '../../mutations/projectMutations';
import { GET_PROJECTS } from '../../queries/projectQueries';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner';
import { useQuery } from '@apollo/client';
import { GET_CLIENTS } from '../../queries/clientQueries';
import { useRef } from 'react';


export default function CreateProjectForm() {
    const navigate = useNavigate();
    const { loading, error, data } = useQuery(GET_CLIENTS)
    
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ status, setStatus ] = useState('');

    const clientIdSelect = useRef(null)
    const statusSelect = useRef(null)
    const [ createProject ] = useMutation(CREATE_PROJECT);
    
    const cliendIdSelectValue = () => {
        return clientIdSelect.current.value
    }
    const statusSelectValue = () => {
        return statusSelect.current.value
    }

    if (loading) return <Spinner/>
    if (error) return <p>Something Went Wrong</p>

    
    const onSubmit = async (e) => {
        e.preventDefault();
        const clientId = cliendIdSelectValue();
        const status = statusSelectValue();
        if (name === '' || description === '' || status === '' || clientId === '') {
            return alert('Please fill in all fields');
        }
        await createProject({
            variables: {clientId, name, description, status},
            refetchQueries: [{ query: GET_PROJECTS }],
            onCompleted: () => { navigate('/projects')}
        });

        setName('')
        setDescription('')
        setStatus('')
    };

    return (
    <>
        <form onSubmit={onSubmit}>
            <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" id="name" value={name} onChange={ (e) => setName(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                    className='form-control'
                    id='description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}>
                    </textarea>
            </div>
            <div className="mb-3">
                <label className="form-label">Status</label>
                <select className="form-select" aria-label="Default select example" ref={statusSelect}>
                    <option value="NEW">Not Started</option>
                    <option value="PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                </select>
            </div>
            { !loading && !error && (
            <div className="mb-3">

            <label className="form-label">Client</label>
            <select className="form-select" aria-label="Default select example" ref={clientIdSelect}>
                    {data.clients.map(client => (
                        <option key={client.id} value={client.id}>{client.name}</option>
                        ))}
            
            </select>
            </div>
            )}


            <button type="submit"className="btn btn-secondary">Submit</button>
        </form>
    </>
    )
}
