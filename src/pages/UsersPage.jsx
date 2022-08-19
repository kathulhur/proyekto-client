import Users from '../components/UserComponents/Users'
import Header from "../components/Header";
import { Link } from 'react-router-dom';

export default function UsersPage() {
  return (
    <>
      <Header />
      <Link to="create" className='btn btn-primary mb-3'>Create User</Link>
      <Users/>
    </>
  )
}
