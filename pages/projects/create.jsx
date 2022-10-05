import CreateProjectForm from '../../src/components/projects/Create'
import Layout from '../../src/components/Layout'
export default function CreateProjectPage() {

  return (
    <>
      <h3>Create Project</h3>
      <CreateProjectForm redirectPath="/projects"/>
    </>
  )
}


CreateProjectPage.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}