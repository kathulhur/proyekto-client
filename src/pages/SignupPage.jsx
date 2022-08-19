import CreateUserForm from "../components/CreateUserForm";

export default function CreateUserPage() {

  return (
    <>
      <h3>Signup</h3>
      <CreateUserForm redirectPath="/login"/>
    </>
  )
}
