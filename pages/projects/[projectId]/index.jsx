import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import Header from '../../../src/components/Header'
import Spinner from '../../../src/components/Spinner'
import DeleteProjectModal from '../../../src/components/projects/Delete'
import {default as NextLink} from 'next/link'
import Layout from '../../../src/components/Layout'
import { Avatar, Box, Button, Chip, Container, Divider, Link, Typography } from '@mui/material'
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'

const query = gql`
    query ProjectPageQuery($id: ID!) {
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
        <Container>
            { !loading && !error && data && (
                <>
                <NextLink href="/projects" passHref>
                    <Button
                        startIcon={<ChevronLeftRoundedIcon/>}
                    >
                        Back
                    </Button>
                </NextLink>
                <Box
                    margin='2rem'
                    padding='2rem'
                    border='solid 1px #E1E1E1'
                    borderRadius='16px'
                >
                    <Box
                        display='flex'
                        justifyContent='space-between'    
                    >
                        <Box>
                            <Typography>
                                {data?.project?.name || 'Placeholder Project Name'}
                            </Typography>
                            <Chip label={data?.project?.status || 'Placeholder Project Name'} color='success'/>
                        </Box>
                        <Box
                            display='flex'
                            flexDirection='row'
                            alignItems='center'
                            columnGap='1rem'
                        >
                            <Typography>
                                {data?.project?.client.name || 'Placeholder Project Name'}
                            </Typography>
                            <Divider orientation='vertical' sx={{width: '1px'}}/>
                            <Avatar/>
                        </Box>
                    </Box>

                    <Divider sx={{width: '100%', marginY: '1rem'}}/>
                    <Typography>{ data.project.description }</Typography>

                    <Box
                        marginTop='1rem'
                        display='flex'
                        justifyContent='flex-end'
                        gap='1rem'
                    >
                        <NextLink href={`/projects/${data.project.id}/update`} passHref>
                            <Button color='warning' variant='contained'>
                                Update Project Details
                            </Button>
                        </NextLink>
                        <DeleteProjectModal/>
                    </Box>
                </Box>
                </>
            )}
        </Container>
    )
}

ProjectPage.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}


export default ProjectPage