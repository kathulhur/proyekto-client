import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { CREATE_PROJECT } from '../../mutations/projectMutations';
import { GET_PROJECTS } from '../../queries/projectQueries';
import ClientSelect from '../ClientComponents/ClientSelect';

export function AddProjectModal() {
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

        await createProject({
            variables: { clientId, name, description, status},
            update(cache, { data: { createProject }}) {
                const { projects } = cache.readQuery({
                    query: GET_PROJECTS
                });
    
                cache.writeQuery({
                    query: GET_PROJECTS,
                    data: { projects: [...projects, createProject]},
                });
            }
        });

        setName('')
        setDescription('')
        setStatus('')
        setClientId('')
    };

    return (
        <>
        <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addProjectModal">
            <div className="d-flex align-items-center">
                <FaUser className='icon'/>
                <div>Add Project</div>
            </div>
        </button>
        <div className="modal fade" id="addProjectModal" tabIndex="-1" aria-labelledby="addProjectModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="addProjectModalLabel">Add Project</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
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


                        <button type="submit" data-bs-dismiss="modal" className="btn btn-secondary">Submit</button>
                    </form>
                </div>
                </div>
            </div>
        </div>
        </>
    )
}
