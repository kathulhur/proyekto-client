import SignUp from '../../src/components/signup/SignUp'
export default function CreateUserPage() {

  return (
    <>
      <SignUp redirectPath={'/signin'}/>
    </>
  )
}
