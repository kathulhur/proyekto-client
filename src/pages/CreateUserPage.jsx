import CreateUserForm from "../components/UserComponents/CreateUserForm";
import Header from "../components/Header";

export default function CreateUserPage() {

  return (
    <>
      <Header />
      <h3>Create User</h3>
      <CreateUserForm redirectPath="/users"/>
    </>
  )
}
