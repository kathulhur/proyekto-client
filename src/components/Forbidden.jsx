import { AiOutlineStop } from 'react-icons/ai';
import Link from "next/link"

export default function Forbidden() {
  return (
    <>
    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
        <AiOutlineStop className="text-danger" size='5em' />
        <h1>403</h1>
        <p className="Lead">Sorry, you don't have the permission to access this page.</p>
        <Link href="/login">
            <a className="btn btn-primary">Login</a>
        </Link>
    </div>
    </>
  )
}
