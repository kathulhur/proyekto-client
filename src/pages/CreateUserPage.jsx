import CreateUserForm from "../components/CreateUserForm";

export default function CreateUserPage() {

  return (
    <>
      <h3>Create User</h3>
      <CreateUserForm redirectPath="/users"/>
    </>
  )
}
