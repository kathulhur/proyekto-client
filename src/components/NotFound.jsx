import { FaExclamationTriangle } from "react-icons/fa"
import Header from "./components/Header";

export default function NotFound() {
  return (
    <>
    <Header />
    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
        <FaExclamationTriangle className="text-danger" size='5em' />
        <h1>404</h1>
        <p className="Lead">Sorry, this page does not exist</p>
        <Link to="/" className="btn btn-primary">
            Go Back
        </Link>
    </div>
    </>
  )
}
