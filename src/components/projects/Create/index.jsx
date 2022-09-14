import { useRouter } from 'next/router'
import { useMutation } from "@apollo/client";
import mutation from "./mutation";
import query from "./query";
import { useState } from 'react'
import { useQuery } from '@apollo/client'
import Spinner from '../../Spinner'


export default function CreateProjectForm() {
    const router = useRouter()

    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ status, setStatus ] = useState('NEW');
    const [ clientId, setClientId ] = useState('');

    const { loading, error, data } = useQuery(query, {
        onCompleted: (data) => {
            setClientId(data.clients[0].id)
        }
    })
    

    const [ createProject ] = useMutation(mutation, {
        variables: { clientId, name, description, status },
        onCompleted: () => router.push('/projects')
    });
    
    if (loading) return <Spinner/>
    if (error) return <p>Something Went Wrong</p>

    
    const onSubmit = async (e) => {
        e.preventDefault();

        if (name === '' || description === '' || status === '' || clientId === '') {
            return alert('Please fill in all fields');
        }
        try {
            await createProject();

        } catch(err) {
            console.log('CreateProjectForm');
            console.log(err);
        }

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
                <select className="form-select" defaultValue={status} onChange={ (e) => setStatus(e.target.value)}>
                    <option value="NEW">Not Started</option>
                    <option value="PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                </select>
            </div>
            { !loading && !error && (
            <div className="mb-3">

            <label className="form-label">Client</label>
            <select className="form-select" defaultValue={clientId} onChange={(e) => setClientId(e.target.value)}>
                    {data.clients?.map(client => (
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
