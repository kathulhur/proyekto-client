import logo from './assets/logo.png'
import './style.css'
import useToken from '../useToken'
import { Link } from 'react-router-dom'

export default function Header() {

  const { token, setToken } = useToken()
  
  return (
    <nav className='navbar bg-light mb-4 p-0'>
        <div className="container d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <a href="/" className="navbar-brand me-5">
                <div className="d-flex">
                    <div className="d-flex">
                      <img src={logo} alt="logo" className='mr-2'/>
                      <div>Project Management</div>
                    </div>
                </div>
            </a>
            
              <Link to="/" className="me-5">Home</Link>
              <Link to="/users" className="me-5">Users</Link>
              <Link to="/clients" className="me-5">Clients</Link>
              <Link to="/projects">Projects</Link>
            </div>

            <div>
              { token && token.token ? 
              (<Link to="/login" className="" onClick={ () => setToken({}) }>Logout</Link> ) : 
              (
              <>
                <Link to="/login" className="me-5">Login</Link>
                <Link to="/signup" className="">Signup</Link>
              </>
              ) 
              }
              
            </div>
        </div>
    </nav>
  )
}
