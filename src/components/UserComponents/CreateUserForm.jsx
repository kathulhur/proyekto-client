import { useMutation } from "@apollo/client"
import { CREATE_USER } from "../../mutations/userMutations"
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import { GET_USERS } from "../../queries/userQueries";
import { getSecretCode, getTwoFactorAuthQrLink } from "../../utils/authUtil";
import { useQuery } from "@apollo/client";
import { GET_GOOGLE_AUTH_API_KEY, GET_APP_NAME } from "../../queries/userQueries";



export default function CreateUserForm({ redirectPath }) {
    const navigate = useNavigate();

    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")
    const { data: getGoogleAuthApiKey } = useQuery(GET_GOOGLE_AUTH_API_KEY);
    const { data: getAppName } = useQuery(GET_APP_NAME);

    const [createUser, { loading, error }] = useMutation(CREATE_USER);

    if (loading) return 'Submitting...';
    if (error) return `Error! ${error.message}`;

    const onSubmit = async (e) => {
        e.preventDefault();
        if (username === "" || password === "") {
            return alert("Please fill in all fields");
        }

        const googleAuthApiKey = getGoogleAuthApiKey.googleAuthApiKey
        const appName = getAppName.appName

        const secretCode = await getSecretCode(googleAuthApiKey);

        const twoFactorAuthQrLink = await getTwoFactorAuthQrLink({googleAuthApiKey, appName, username, secretCode});

        console.log(username, password, secretCode, twoFactorAuthQrLink)
        await createUser({
            variables: { username, password, secretCode, twoFactorAuthQrLink },
            refetchQueries: [{ query: GET_USERS }],
            onCompleted: () => { navigate(redirectPath) }
        });
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
