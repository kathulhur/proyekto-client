import ClientsTable from '../../src/components/clients/Table';
import { default as NextLink } from 'next/link'
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add'
import Layout from '../../src/components/Layout';
export default function ClientsPage() {
    
    return (
        <>
            <NextLink href='/clients/create' passHref>
                <Button variant="outlined" startIcon={<AddIcon />}>
                    New Client
                </Button>
            </NextLink>
            <br/>
            <br/>
            <br/>
            <ClientsTable/>
        </>
    )
}

ClientsPage.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
