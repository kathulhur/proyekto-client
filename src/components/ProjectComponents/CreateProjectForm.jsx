import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_PROJECT } from '../../mutations/projectMutations';
import { GET_PROJECTS } from '../../queries/projectQueries';
import ClientSelect from '../ClientComponents/ClientSelect';
import { useNavigate } from 'react-router-dom';

export default function CreateProjectForm() {
    const navigate = useNavigate();

    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ status, setStatus ] = useState('');
    const [ clientId, setClientId ] = useState('');

    const [ createProject ] = useMutation(CREATE_PROJECT);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (name === '' || description === '' || status === '' || clientId === '') {
            return alert('Please fill in all fields');
        }

        console.log(name)
        console.log(description)
        console.log(status)
        console.log(clientId)
        await createProject({
            variables: {clientId, name, description, status},
            refetchQueries: [{ query: GET_PROJECTS }],
            onCompleted: () => { navigate('/projects')}
        });

        setName('')
        setDescription('')
        setStatus('')
        setClientId('')
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
                <select className="form-select" aria-label="Default select example" defaultValue="NEW" onChange={ (e) => setStatus(e.target.value)}>
                    <option value="NEW">Not Started</option>
                    <option value="PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                </select>
            </div>
            <ClientSelect onChange={ (e) => setClientId(e.target.value)}/>


            <button type="submit"className="btn btn-secondary">Submit</button>
        </form>
    </>
    )
}
