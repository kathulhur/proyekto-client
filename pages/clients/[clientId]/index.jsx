import { useQuery, useMutation, gql } from '@apollo/client'
import { useRouter } from 'next/router'
import Spinner from '../../../src/components/Spinner'
import {default as NextLink} from 'next/link'
import DeleteClientModal from '../../../src/components/clients/Delete'
import Layout from '../../../src/components/Layout'
import { Avatar, Box, Button, Container, Paper, Typography } from '@mui/material'
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'

const query = gql`
    query ClientPageQuery($id: ID!) {
        client(id: $id) {
            id
            name
            email
            phone
        }
    }
`;



export default function ClientPage() {
    const router = useRouter();
    const clientId = router.query?.clientId;


    const { data, loading, error } = useQuery(query, {
        skip: !clientId,
        variables: {
            id: clientId
        }
    });
    
    if (loading) return <Spinner />;
    if (error) return (
        <>
            {console.log(error)}
            <p>Something went wrong</p>
        </>
    )
    
    return (
        <Container >
            <NextLink href="/projects" passHref>
                <Button
                    startIcon={<ChevronLeftRoundedIcon/>}
                >
                    Back
                </Button>
            </NextLink>
            <Typography 
                paddingBottom='2rem' 
                textAlign='center' 
                fontWeight='bold' 
                variant='h5' 
                component='h2'
            >
                My Profile
            </Typography>
            <Box 
                display='flex' 
                flexDirection='column' 
                padding='2rem' 
                alignItems='center' 
                minWidth={'600px'}
                border='solid 1px #E1E1E1'
                borderRadius='16px'
            >
                <Avatar sx={{ width: '128px', height: '128px'}}/>
                <Typography marginTop={'2rem'} variant='h3' fontWeight={'bold'}>
                    {data?.client?.name}
                </Typography>
                <Typography 
                    variant='subtitle2'
                    component='p'
                >
                    {data?.client?.phone}
                </Typography>
                <Typography 
                    variant='subtitle2'
                    component='p'
                    marginBottom='2rem'
                >
                    {data?.client?.email}
                </Typography>

                <Box
                    marginTop='1rem'
                    display='flex'
                    justifyContent='flex-end'
                    gap='1rem'
                >
                    <NextLink href={`/clients/${data?.client?.id}/update`} passHref>
                        <Button color='warning' variant='contained'>
                            Update Client Details
                        </Button>
                    </NextLink>
                    <DeleteClientModal/>
                </Box>
            </Box>
        </Container>
    )
}


ClientPage.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}