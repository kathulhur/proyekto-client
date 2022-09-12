import { useState } from "react"
import { useMutation } from "@apollo/client"
import query from "./query"
import mutation from "./mutation"

export default function EditProjectForm() {
    const [name, setName] = useState(project.name)
    const [description, setDescription] = useState(project.description)
    const [status, setStatus] = useState(project.status);

    const { loading, error, data } = useQuery(query, {
            onCompleted: (data) => {
                setName(data.project.name)
                setDescription(data.project.description)
                setStatus(data.project.status)
            }
        }
    )

    const [ editProject ] = useMutation(mutation);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (name === "" || description === "" || status === "") {
            return alert("Please fill in all fields");
        }

        await editProject();
    }

    return (
        <div className='mt-5'>
            <h3>Update Project Details</h3>
            <form onSubmit={ onSubmit }>
            <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" id="name" value={name} onChange={ (e) => setName(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Description</label>
                <input type="text" className="form-control" id="description" value={description} onChange={ (e) => setDescription(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Status</label>
                <select className="form-select" aria-label="Default select example" defaultValue={status} onChange={ (e) => setStatus(e.target.value)}>
                    <option value="NEW">Not Started</option>
                    <option value="PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
