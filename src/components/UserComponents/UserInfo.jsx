import { FaLock, FaCode, FaUserCircle,  FaUsers, FaShieldAlt} from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function UserInfo({ user }) {
  return (
    <>
        <h5 className="mt-5">User Information</h5>
        <ul className="list-group">
            <li className="list-group-item">
                <FaUserCircle className='icon'/> <b>Username:</b> {user.username}
                
            </li>
            <li className="list-group-item">
                <FaLock className='icon'/> <b>Password</b>: {user.password}
                
            </li>
            <li className="list-group-item">
                <FaCode className='icon'/> <b>secretCode:</b> {user.secretCode}
            </li>
            <li className="list-group-item">
                <FaUsers className='icon'/> <b>Role:</b> {user.role}
            </li>
            <li className="list-group-item">
                <FaShieldAlt className='icon'/> <b>TwoFactorAuthentication:</b> {user.twoFactorAuthEnabled ? 'Enabled' : 'Disabled'}
            </li>
            <li className="list-group-item">
                <FaShieldAlt className='icon'/> <b>TwoFactorAuthentication QRCode Link:</b> <a href={user.twoFactorAuthQrLink}>Click Here</a>
            </li>
            <Link to={`/users/${user.id}/edit`} className="btn btn-primary btn-sm mt-3">Edit</Link>
        </ul>
    </>
  )
}
