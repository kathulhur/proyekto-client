import CreateProjectForm from '../../src/components/projects/Create'
import Header from '../../src/components/Header'

export default function CreateProjectPage() {

  return (
    <>
      <Header />
      <h3>Create Project</h3>
      <CreateProjectForm redirectPath="/users"/>
    </>
  )
}
