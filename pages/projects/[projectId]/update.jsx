import Layout from '../../../src/components/Layout'
import UpdateProjectForm from '../../../src/components/projects/Update'

export default function UpdateProjectPage() {
    
    return (
        <>
            <h3>Update Project</h3>
            <UpdateProjectForm />
        </>
    )

}


UpdateProjectPage.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
