import Spinner from "../components/Spinner";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_CLIENT } from "../queries/clientQueries";
import EditClientForm from "../components/ClientComponents/EditClientForm";

export default function EditClientPage() {
    
    const { id } = useParams();

    const { loading, error, data } = useQuery(GET_CLIENT, { 
        variables: { id },
        }
    );

    if (loading) return <Spinner />;
    if (error) return <p>Something went wrong</p>;

    return (
        <>
        <Header/>
        <EditClientForm client={ data.client } />
        </>
    )

}
