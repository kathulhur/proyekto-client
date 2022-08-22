import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { EDIT_USER } from "../../mutations/userMutations";
import { GET_USER } from "../../queries/userQueries";

export default function EditUserForm({ user }) {
    const navigate = useNavigate();

    const [ username, setUsername ] = useState(user.username)
    const [ password, setPassword ] = useState(user.password)
    const [ twoFactorAuthEnabled, setTwoFactorAuthEnabled ] = useState(user.twoFactorAuthEnabled)
    const roleSelect = useRef(null);
    const [updateUser] = useMutation(EDIT_USER);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (username === "" || password === "") {
            return alert("Please fill in all fields");
        }
        const role = roleSelect.current.value;

        await updateUser({
            variables: { id: user.id, username, password,  twoFactorAuthEnabled, role},
            refetchQueries: [{ query: GET_USER, variables: { id: user.id } }],
            onCompleted: () => navigate(`/users/${user.id}`)
        });
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
            <div className="mb-3">
                <label className="form-label">Status</label>
                <select className="form-select" aria-label="Default select example" ref={roleSelect}>
                    <option value="USER">User</option>
                    <option value="ADMIN">Admin</option>
                </select>
            </div>
            <div className="form-check mb-5">
                <input className="form-check-input" type="checkbox" checked={ twoFactorAuthEnabled } onChange={ (e) => setTwoFactorAuthEnabled(!twoFactorAuthEnabled)} id="is-two-factor-auth-enabled"/>
                <label className="form-check-label" htmlFor="is-two-factor-auth-enabled">
                    Enable Two Factor Authentication
                </label>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
