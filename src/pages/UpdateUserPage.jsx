import { Link, useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import EditUserForm from "../components/EditUserForm"
import { GET_USER } from "../queries/userQueries"
import Spinner from "../components/Spinner"


export default function EditUserPage() {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_USER, { 
    variables: { id },
    }
  );

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong</p>;

  return (
    <>
      <EditUserForm user={ data.user } />
    </>
  )
}
