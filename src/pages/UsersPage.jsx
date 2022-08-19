import Users from '../components/Users'

export default function UsersPage() {
  return (
    <>
      <a href="users/create" className='btn btn-primary mb-3'>Create User</a>
      <Users/>
    </>
  )
}
