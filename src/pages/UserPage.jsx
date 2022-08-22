import { Link, useParams } from "react-router-dom"
// use params can be used to get the parameter from the url
import Spinner from "../components/Spinner";
import { useQuery } from "@apollo/client";
import { GET_USER } from '../queries/userQueries';
import UserInfo from "../components/UserComponents/UserInfo";

import Header from "../components/Header";


export default function Project() {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_USER, {
        variables: {
            id: id
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
    { !loading && !error && (
      <div className="mx-auto w-75 card p-5">
        <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">Back</Link>

        <UserInfo user={ data.user } />
      </div>
      )}
    </>
  )
}
