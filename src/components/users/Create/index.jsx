import { useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import { useState } from "react";
import mutation from "./mutation";

export default function CreateUserForm({ redirectPath }) {
    const router = useRouter()

    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")

    const [createUser, { loading, error }] = useMutation(mutation, {
        variables: { username, password },
        onCompleted: () => { router.push(redirectPath) }
    });

    if (loading) return 'Submitting...';
    if (error) return `Error! ${error.message}`;

    const onSubmit = async (e) => {
        e.preventDefault();
        if (username === "" || password === "") {
            return alert("Please fill in all fields");
        }
        try {
            await createUser();
        } catch (err) {
            console.log('CreateUserForm');
            console.log(err);
        }
        
    }

    return (
        <>
        <div className='mt-5'>
            <form onSubmit={ onSubmit }>
            { error && <div className="alert alert-danger">{ error.message }</div> }
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
        </>
    )
}
