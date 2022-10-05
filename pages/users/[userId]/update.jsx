import UpdateUserForm from '../../../src/components/users/Update'
import Layout from '../../../src/components/Layout'
export default function UpdateUserPage() {
    return (
        <>
            <UpdateUserForm />
        </>
    )
}


UpdateUserPage.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}