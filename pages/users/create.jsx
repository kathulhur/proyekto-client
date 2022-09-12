import CreateUserForm from '../../src/components/users/Create';
import Header from '../../src/components/Header';

export default function CreateUserPage() {

  return (
    <>
      <Header />
      <h3>Create User</h3>
      <CreateUserForm redirectPath="/users"/>
    </>
  )
}
