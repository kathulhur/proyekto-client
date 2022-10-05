import Spinner from '../../../src/components/Spinner';
import Header from "../../../src/components/Header";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from 'next/router'
import DeleteUserModal from '../../../src/components/users/Delete';
import { Avatar, Button, Card, Link, Paper, Typography } from '@mui/material';
import Layout from '../../../src/components/Layout';
import { Container } from 'react-bootstrap';
import { Box } from '@mui/system';
import  NextLink from 'next/link'
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'

const query = gql`
    query UserPageQuery($id: ID!) {
        user(id: $id) {
            id
            username
            password
            secretCode
            role
            twoFactorAuthEnabled
            twoFactorAuthQrLink
        }
    }
`

export default function UserPage() {
    const router = useRouter()
    const userId = router.query?.userId

    const { loading, error, data } = useQuery(query, {
        skip: !userId,
        variables: {
            id: userId
        }
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
        <NextLink href="/users" passHref>
                <Button
                    startIcon={<ChevronLeftRoundedIcon/>}
                >
                    Back
                </Button>
            </NextLink>
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
            <Typography paddingBottom={'2rem'} textAlign='center' fontWeight='bold' variant='h5' component='h2'>
                My Profile
            </Typography>
            <Paper elevation={3} sx={{ maxWidth: '900px'}}>
                <Box display='flex' flexDirection='column' padding={'2rem'} alignItems='center' minWidth={'600px'}>
                    <Avatar sx={{ width: '128px', height: '128px'}}/>
                    <Typography marginTop={'2rem'} variant='h3' fontWeight={'bold'}>
                        {data?.user?.username}
                    </Typography>
                    <Typography variant='subtitle2'>
                        {data?.user?.role}
                    </Typography>
                    <br/>
                    <br/>
                    <Typography marginBottom={'2rem'} variant='subtitle2'>
                        Two Factor Authentication Enabled: {String(data?.user?.twoFactorAuthEnabled)}
                    </Typography>
                    <Typography marginBottom={'2rem'} variant='subtitle2'>
                        Two Factor Authentication QR Link:
                        <Link href={String(data?.user?.twoFactorAuthQrLink)} target={'_blank'}>
                            Click Here
                        </Link>
                    </Typography>
                    <NextLink
                        href={`/users/${data?.user?.id}/update`}
                        passHref
                    >
                        <Button variant='outlined'>
                            Update Profile
                        </Button>
                    </NextLink>
                </Box>

            </Paper>
        </Box>
    </Container>
  )
}

UserPage.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}


