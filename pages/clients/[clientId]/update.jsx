import UpdateClientForm from '../../../src/components/clients/Update'
import Layout from '../../../src/components/Layout'

export default function UpdateClientPage() {
    
    return (
        <>
            <h3>Update Client</h3>
            <UpdateClientForm />
        </>
    )

}


UpdateClientPage.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}