import logo from './assets/logo.png'
import './style.css'

export default function Header() {
  return (
    <nav className='navbar bg-light mb-4 p-0'>
        <div className="container d-flex justify-content-start">
            <a href="/" className="navbar-brand me-5">
                <div className="d-flex">
                    <div className="d-flex">
                      <img src={logo} alt="logo" className='mr-2'/>
                      <div>Project Management</div>
                    </div>
                </div>
            </a>
            <div>
              <a href="/" className="me-5">Home</a>
              <a href="/users">Users</a>
            </div>
        </div>
    </nav>
  )
}
