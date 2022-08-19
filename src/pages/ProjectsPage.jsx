import Header from "../components/Header";
import Projects from '../components/ProjectComponents/Projects';
import { Link } from "react-router-dom";

export default function ClientsPage() {

  return (
    <>
        <Header />
        <Link to='create' className='btn btn-primary mb-3'>Create Project</Link>
        <Projects/>
    </>
  )
}
