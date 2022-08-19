import Header from "../components/Header";
import Clients from '../components/ClientComponents/Clients';
import { Link } from "react-router-dom";

export default function ClientsPage() {

  return (
    <>
        <Header />
        <Link to='create' className='btn btn-primary mb-3'>Add Client</Link>
        <Clients/>
    </>
  )
}
