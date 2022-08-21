import Spinner from '../Spinner'
import { useQuery } from '@apollo/client'
import { GET_PROJECTS } from '../../queries/projectQueries'
import ProjectCard from './ProjectCard'
import { Link } from 'react-router-dom'
import Forbidden from '../Forbidden'

export default function Projects() {
    const { loading, error, data } = useQuery(GET_PROJECTS)
    if (loading) return <Spinner />;
    if (error) return (
        <>
        { error.graphQLErrors[0].extensions.code === "FORBIDDEN" ? 
            <Forbidden/> : // if the error code is forbidden
        <p>Something Went Wrong</p>
        }
        </>
    )

    return (
        <>
            { data.projects.length > 0 ? (
                <>
                    <Link to='/projects/create' className='btn btn-primary mb-3'>Create Project</Link>
                    <div className="row mt-4">
                        { data.projects.map( (project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                </>
            ) : (<p>No projects yet</p>)}
        </>
    )
}