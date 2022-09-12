import CreateUserForm from "../components/UserComponents/CreateUserForm";
import Header from "../components/Header";

export default function CreateUserPage() {

  return (
    <>
    
      <Header />
      <h3>Signup</h3>
      <CreateUserForm redirectPath="/login"/>
    </>
  )
}
