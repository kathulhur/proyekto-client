import { useMutation } from "@apollo/client"
import { ADD_USER } from "../../mutations/userMutations"
import { useNavigate } from "react-router-dom"
import { useState } from "react";

export default function AddUserForm() {
    const navigate = useNavigate();

    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")
    
    const [addUser] = useMutation(ADD_USER, {
        variables: { username, password },
        onCompleted: () => navigate(`/users`)
    });


    const onSubmit = (e) => {
        e.preventDefault();
        if (username === "" || password === "") {
            return alert("Please fill in all fields");
        }

        addUser(username, password);
    }



    return (
        <div className='mt-5'>
            <h3>New User</h3>
            <form onSubmit={ onSubmit }>
            <div className="mb-3">
                <label className="form-label">Username</label>
                <input type="text" className="form-control" id="username" value={username} onChange={ (e) => setUsername(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" id="password" value={password} onChange={ (e) => setPassword(e.target.value)}/>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
