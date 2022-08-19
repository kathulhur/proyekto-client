import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import EditUserForm from "../components/UserComponents/EditUserForm"
import { GET_USER } from "../queries/userQueries"
import Spinner from "../components/Spinner"
import Header from "../components/Header";

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
      <Header/>
      <EditUserForm user={ data.user } />
    </>
  )
}
