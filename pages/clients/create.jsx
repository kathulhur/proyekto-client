import CreateClientForm from '../../src/components/clients/Create'
import Layout from '../../src/components/Layout'

export default function CreateClientPage() {
    return (
    <>
        <CreateClientForm/>
    </>
    )
}

CreateClientPage.getLayout = function getLayout(page) {
    return (
    <Layout>
        {page}
    </Layout>
    )
}
