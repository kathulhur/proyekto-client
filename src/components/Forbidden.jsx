import { AiOutlineStop } from 'react-icons/ai';
import { Link } from "react-router-dom"

export default function Forbidden() {
  return (
    <>
    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
        <AiOutlineStop className="text-danger" size='5em' />
        <h1>403</h1>
        <p className="Lead">Sorry, you don't have the permission to access this page.</p>
        <Link to="/login" className="btn btn-primary">
            login
        </Link>
    </div>
    </>
  )
}
