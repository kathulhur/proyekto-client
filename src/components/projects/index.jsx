import query from './query'
import Forbidden from '../Forbidden';
import { useQuery } from "@apollo/client";
import ProjectCard from './Card';
import { LinearProgress } from '@mui/material';
import { useRouter } from 'next/router'
export default function Projects() {
    const router = useRouter()
    const { loading, error, data } = useQuery(query);

    if (loading) return <LinearProgress />;
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
            { data.projects?.length > 0 
                ?
                <>
                    { data.projects.map( (project) => (
                        <ProjectCard key={project.id} project={project}/>
                        ))}
                </>
                :
                (<div className='d-flex justify-content-center mt-5'><p>No projects yet</p></div>)
            }
        </>
    )
}