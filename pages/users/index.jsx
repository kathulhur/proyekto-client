import UsersTable from '../../src/components/users/Table'
import { Container } from '@mui/material';
import { default as NextLink } from 'next/link'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add'
import Layout from '../../src/components/Layout';
export default function UsersPage() {

    return (
        <>
            <NextLink href='/users/create' passHref>
                <Button variant="outlined" startIcon={<AddIcon />}>
                    New User
                </Button>
            </NextLink>
            <br/>
            <br/>
            <br/>
            <UsersTable />
        </>
    )
}


UsersPage.getLayout = function getLayout(page) {
    return (
    <Layout>
        {page}
    </Layout>
    )
}
