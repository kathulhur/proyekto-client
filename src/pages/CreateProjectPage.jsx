import CreateProjectForm from "../components/ProjectComponents/CreateProjectForm";
import Header from "../components/Header";

export default function CreateProjectPage() {

  return (
    <>
      <Header />
      <h3>Create Project</h3>
      <CreateProjectForm redirectPath="/users"/>
    </>
  )
}
