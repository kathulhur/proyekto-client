import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PROJECT } from '../../mutations/projectMutations';
import { GET_PROJECTS } from '../../queries/projectQueries';
import ClientSelect from '../ClientComponents/ClientSelect';
import { useNavigate } from 'react-router-dom';

export default function CreateProjectForm() {
    const navigate = useNavigate();

    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ status, setStatus ] = useState('');
    const [ clientId, setClientId ] = useState('');

    const [ addProject ] = useMutation(ADD_PROJECT, {
        variables: { name, description, status, clientId},
        refetchQueries: [{ query: GET_PROJECTS }],
        onCompleted: () => { navigate('/projects')}
    });

    const onSubmit = (e) => {
        e.preventDefault();
        if (name === '' || description === '' || status === '' || clientId === '') {
            return alert('Please fill in all fields');
        }

        addProject(name, description, status, clientId);

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
                <select className="form-select" aria-label="Default select example" defaultValue="In Progress" onChange={ (e) => setStatus(e.target.value)}>
                    <option value="new">Not Started</option>
                    <option value="progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
            <ClientSelect onChange={ (e) => setClientId(e.target.value)}/>


            <button type="submit"className="btn btn-secondary">Submit</button>
        </form>
    </>
    )
}
