import Link from 'next/link'
import Spinner from '../../../src/components/Spinner';
import Header from "../../../src/components/Header";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from 'next/router'
import { FaCode, FaLock, FaShieldAlt, FaUserCircle, FaUsers } from 'react-icons/fa';
import DeleteUserModal from '../../../src/components/users/Delete';

const query = gql`
    query UserPageQuery($id: ID!) {
        user(id: $id) {
            id
            username
            password
            secretCode
            role
            twoFactorAuthEnabled
            twoFactorAuthQrLink
        }
    }
`

export default function User() {
    const router = useRouter()
    const userId = router.query?.userId

    const { loading, error, data } = useQuery(query, {
        skip: !userId,
        variables: {
            id: userId
        }
    })
    
    
    if (loading) return <Spinner />;
    if (error) return (
        <>
        {console.log(error)}
        <p>Something went wrong</p>
        </>
    )


  return (
    <>
        <Header />
        { !loading && !error && data && (
        <div className="mx-auto w-75 card p-5">
            <Link href="/">
                <a className="btn btn-primary btn-sm w-25 d-inline ms-auto">Back</a>
            </Link>
            <h5 className="mt-5">User Information</h5>
            <ul className="list-group">
                <li className="list-group-item">
                    <FaUserCircle className='icon'/> <b>Username:</b> {data.user?.username}
                </li>
                <li className="list-group-item">
                    <FaLock className='icon'/> <b>Password</b>: {data.user?.password}
                </li>
                <li className="list-group-item">
                    <FaCode className='icon'/> <b>secretCode:</b> {data.user?.secretCode}
                </li>
                <li className="list-group-item">
                    <FaUsers className='icon'/> <b>Role:</b> {data.user?.role}
                </li>
                <li className="list-group-item">
                    <FaShieldAlt className='icon'/> <b>TwoFactorAuthentication:</b> {data.user?.twoFactorAuthEnabled ? 'Enabled' : 'Disabled'}
                </li>
                <li className="list-group-item">
                    <FaShieldAlt className='icon'/> <b>TwoFactorAuthentication QRCode Link:</b> <a href={data.user?.twoFactorAuthQrLink} target='_blank'>Click Here</a>
                </li>
            </ul>
            <div className='d-flex justify-content-end mt-3'>
                <Link href={`/users/${data.user?.id}/update`}>
                    <a className="btn btn-primary me-3">Update</a>
                </Link>
                <DeleteUserModal/>
            </div>
        </div>
        )}
    </>
  )
}
