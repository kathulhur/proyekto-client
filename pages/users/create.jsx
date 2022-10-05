import CreateUserForm from '../../src/components/users/Create';
import Header from '../../src/components/Header';
import Layout from '../../src/components/Layout';

export default function CreateUserPage() {

  return (
    <>
      <h3>Create User</h3>
      <CreateUserForm redirectPath="/users"/>
    </>
  )
}


CreateUserPage.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
