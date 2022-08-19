import logo from './assets/logo.png'
import './style.css'
import useToken from '../useToken'


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
            
              <a href="/" className="me-5">Home</a>
              <a href="/users">Users</a>
            </div>

            <div>
              { token && token.token ? 
              (<a href="/" className="" onClick={ () => setToken({}) }>Logout</a> ) : 
              (<a href="/" className="">Login</a>) 
              }
              
            </div>
        </div>
    </nav>
  )
}
