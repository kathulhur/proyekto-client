import { useQuery } from "@apollo/client"
import { GET_CLIENTS } from "../../queries/clientQueries"
import Spinner from "../Spinner"

export default function ClientSelect({ onChange }) {

    const { loading, error, data } = useQuery(GET_CLIENTS)
    if (loading) return <Spinner/>
    if (error) return <p>Something Went Wrong</p>
    console.log(data.clients[0].id)
    return (
        <>
        { !loading && !error && (
            <div className="mb-3">
            <label className="form-label">Client</label>
            <select className="form-select" aria-label="Default select example" defaultValue={data.clients[0].id} onChange={onChange}>
                    {data.clients.map(client => (
                        <option key={client.id} value={client.id}>{client.name}</option>
                        ))}
            
            </select>
        </div>
        )
    }
    </>)
}
