import { useMutation } from "@apollo/client"
import { SIGN_UP } from "../../mutations/userMutations"
import { useNavigate } from "react-router-dom"
import { useState } from "react";

async function getSecretCode() {
    const options = {
        method: 'POST',
        headers: {
            'X-RapidAPI-Key': '482774802cmsh9f7a363a2d2f393p14409cjsn0bbd5071a76b',
            'X-RapidAPI-Host': 'google-authenticator.p.rapidapi.com'
        }
    };
    
    return fetch('https://google-authenticator.p.rapidapi.com/new_v2/', options)
        .then(response => response.text())
        .catch(err => console.error(err));
}


export default function CreateUserForm({ redirectPath }) {
    const navigate = useNavigate();

    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")
    let secretCode = "";
    const [createUser, { loading, error }] = useMutation(SIGN_UP);

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;


    const onSubmit = async (e) => {
        e.preventDefault();
        if (username === "" || password === "") {
            return alert("Please fill in all fields");
        }

        secretCode = await getSecretCode();
        console.log(secretCode);
        createUser({
            variables: { username, password, secretCode},
            onCompleted: () => { navigate(redirectPath) }
        });
    }



    return (
        <>
        <div className='mt-5'>
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
        </>
    )
}
