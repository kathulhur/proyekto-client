import { useState } from "react"
import { useMutation } from "@apollo/client"
import { EDIT_PROJECT } from "../../mutations/projectMutations"
import { GET_PROJECT } from "../../queries/projectQueries"

export default function EditProjectForm({ project }) {
    const [name, setName] = useState(project.name)
    const [description, setDescription] = useState(project.description)
    const [status, setStatus] = useState("");


    const [ editProject ] = useMutation(EDIT_PROJECT);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (name === "" || description === "" || status === "") {
            return alert("Please fill in all fields");
        }
        console.log(project.id)
        await editProject({
            variables: { id: project.id, name, description, status },
            refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }]
        });
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
                <select className="form-select" aria-label="Default select example" defaultValue="NEW" onChange={ (e) => setStatus(e.target.value)}>
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
