import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@apollo/client"
import { UPDATE_USER } from "../../mutations/userMutations"

export default function EditUserForm({ user }) {
    const navigate = useNavigate();

    const [ username, setUsername ] = useState(user.username)
    const [ password, setPassword ] = useState(user.password)

    console.log(user)

    const [updateUser] = useMutation(UPDATE_USER, {
        variables: { id: user.id, username, password },
        onCompleted: () => navigate(`/users`)
    });

    const onSubmit = (e) => {
        e.preventDefault();
        if (username === "" || password === "") {
            return alert("Please fill in all fields");
        }

        updateUser(username, password);
    }

    return (
        <div className='mt-5'>
            <h3>Update Project Details</h3>
            <form onSubmit={ onSubmit }>
            <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" id="name" value={username} onChange={ (e) => setUsername(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Description</label>
                <input type="password" className="form-control" id="password" value={password} onChange={ (e) => setPassword(e.target.value)}/>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
