import Link from 'next/link'
import query from './query'
import Spinner from '../../Spinner';
import Forbidden from '../../Forbidden';
import { useQuery } from "@apollo/client";
export default function Projects() {
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
        <Link href='/projects/create'>
            <a className='btn btn-primary mb-3'>Create Project</a>
        </Link>
            { data.projects?.length > 0 ? (
            <>
                <div className="row mt-4">
                    { data.projects.map( (project) => (
                        <div key={project.id} className='col-md-4'>
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h5 className="card-title">{project.name}</h5>
                    
                                        <a className='btn btn-light' href={`/projects/${project.id}`}>View</a>
                                    </div>
                                    <p className="small">
                                        Status: <strong>{project.status}</strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </>
            ) : (<div className='d-flex justify-content-center mt-5'><p>No projects yet</p></div>)}
        </>
    )
}