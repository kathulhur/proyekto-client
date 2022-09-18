import Link from 'next/link'
import query from './query'
import Spinner from '../../Spinner';
import Forbidden from '../../Forbidden';
import { useQuery } from "@apollo/client";
import Card from 'react-bootstrap/Card';
import { Col, Container, Row } from 'react-bootstrap';


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
                <Container className='mt-3 p-0' fluid>
                    <Row xs={{cols: 2}} xl={{cols: 3}} >
                    { data.projects.map( (project) => (
                        <Col key={project.id} className='mb-4'>
                            <Card key={project.id}>
                                <Card.Body>
                                    <Card.Title>{project.name}</Card.Title>
                                    <Card.Text>{project.description}</Card.Text>
                                    <Link href={`/projects/${project.id}`}>
                                        <a className='btn btn-primary'>View Project</a>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                    </Row>
                </Container>
            </>
            ) : (<div className='d-flex justify-content-center mt-5'><p>No projects yet</p></div>)}
        </>
    )
}