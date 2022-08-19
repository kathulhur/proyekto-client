import Users from '../components/Users'
import { Link } from 'react-router-dom'

export default function UsersPage() {
  return (
    <>
      <Link to='/users/create' className='btn btn-primary mb-3'>Create User</Link>
      <Users/>
    </>
  )
}
