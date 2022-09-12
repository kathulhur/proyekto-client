import logo from './assets/rocket-icon.svg'
import Link from 'next/link'
import { useQuery, gql } from '@apollo/client'
import { useApolloClient } from '@apollo/client'
import Image from 'next/image'

const query = gql`
    query HeaderQuery {
        user: getLoggedInUser {
            id
            username
        }
    }
`

export default function Header() {
  const client = useApolloClient();
  const { data, loading, error } = useQuery(query, {
        fetchPolicy: 'network-only',
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  
  return (
    <nav className='navbar mb-4 py-3'>
        <div className="container d-flex justify-content-between">
            <div className="d-flex align-items-center">
                <Link href="/">
                    <div className="d-flex navbar-brand me-5">
                        <div className="d-flex me-2">
                            <Image 
                                src={logo} 
                                alt="logo" 
                            />
                            <b>PROYEKTO</b>
                        </div>
                    </div>
                </Link>
                
                <Link href="/">
                    <a className='mx-4 text-center'>Home</a>
                </Link>
                <Link href="/users">
                    <a className='mx-4'>Users</a>
                </Link>
                <Link href="/clients">
                    <a className='mx-4'>Clients</a>
                </Link>
                <Link href="/projects">
                    <a className='mx-4'>Projects</a>
                </Link>
            </div>

            <div className='d-flex align-items-center'>
                { !loading && !error && data.user ? 
                (
                    <>
                        <Link href={`/users/${data.user.id}`} className="">
                            <a className='border rounded px-4 me-3'>
                                {data.user.username}
                            </a>
                        </Link>
                        <Link href="/login">
                            <a className='border rounded px-4 me-3' onClick={ () => { localStorage.clear(); client.clearStore(); } }>
                                Logout
                            </a>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link href="/login">
                            <a className="me-5">Login</a>
                        </Link>
                        <Link href="/signup" className="">
                            <a>Sign Up</a>
                        </Link>
                    </>
                ) 
                }
                
            </div>
        </div>
    </nav>
  )
}
