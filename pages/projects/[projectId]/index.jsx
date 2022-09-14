import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import Header from '../../../src/components/Header'
import Spinner from '../../../src/components/Spinner'
import UpdateProject from '../../../src/components/projects/Update'
import Link from 'next/link'

const query = gql`
    query Project($id: ID!) {
        project(id: $id) {
            id
            name
            description
            status
            client {
                id
                name
            }
        }
    }
`

function ProjectPage() {
    const router = useRouter()
    const projectId = router.query?.projectId
    
    const { data, loading, error } = useQuery(query, {
        skip: !projectId,
        variables: { id: projectId },
    })

    if (loading) return <Spinner />;
    if (error) return (
        <>
        {console.log(error)}
        <p>Something went wrong</p>
        </>
    )


    return (
        <>
            <Header />
            { !loading && !error && data && (
                <div className="mx-auto w-75 card p-5">
                <Link href="/">
                    <a className="btn btn-primary btn-sm w-25 d-inline ms-auto">Back</a>
                </Link>
        
                <h3>Project: { data.project.name }</h3>
                <h4>Client: {data.project.client.name}</h4>
                <hr />

                <p>{ data.project.description }</p>

                <h5 className="mt-3">Project Status</h5>
                <p className="lead">{ data.project.status }</p>
        
                <Link href={`/projects/${data.project.id}/update`}>
                    <a className="btn btn-primary">Update Project</a>
                </Link>
                
              </div>
            )}
        </>
    )
}

export default ProjectPage