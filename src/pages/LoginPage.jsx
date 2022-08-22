import { useState } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useMutation } from "@apollo/client";
import { SIGN_IN } from "../mutations/userMutations"; // import the mutation
import { useQuery } from "@apollo/client";
import Spinner from "../components/Spinner";
import { validateTwoFactorAuth } from '../utils/authUtil';
import { GET_GOOGLE_AUTH_API_KEY } from "../queries/userQueries";



export default function LoginPage({ token, setToken }) {
    const navigate = useNavigate();
    
    const [ signIn, { loading: signInLoading, error: signInError }] = useMutation(SIGN_IN);
    const { data: getGoogleAuthApiKey } = useQuery(GET_GOOGLE_AUTH_API_KEY);
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ code, setCode ] = useState("");
    const [ payload , setPayload ] = useState(null);

    const onSubmit = async e => {
        e.preventDefault();
        
        if (!payload)
        {
            const { data } = await signIn({
                variables: {
                    username,
                    password
                }
            });

            if (!data.signIn.user.twoFactorAuthEnabled) {
                setToken(data.signIn.token)
                navigate("/");
            } else {
                setPayload(data.signIn);
            }
        }
            
        if (payload) {

            switch (payload.user.twoFactorAuthEnabled) {
                case false:// if two factor authentication is disabled
                    setToken(payload.token);
                    navigate("/");
                    break;

                case true: // if two factor authentication is enabled
                    const googleAuthApiKey = getGoogleAuthApiKey.googleAuthApiKey;
                    const isValid = await validateTwoFactorAuth(googleAuthApiKey, code, payload.user.secretCode);
                    if (isValid === "True") {
                        setToken(payload.token);
                        navigate("/");
                    }
                    break;

                default:
                    console.log('default')
            }
        }
        
    }

      
    return (
        <>
        <Header/>
        <div className='mt-5'>
            <h3>Login</h3>
            <form onSubmit={ onSubmit }>
            { signInError && <div className="alert alert-danger">{ signInError.message }</div> }
            <div className="mb-3">
                <label className="form-label">Username</label>
                <input type="text" className="form-control" id="username" onChange={ (e) => setUsername(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" id="password" onChange={ (e) => setPassword(e.target.value)}/>
            </div>
            { payload && payload.user.twoFactorAuthEnabled ? (
            <div className="mb-3">
                <label className="form-label">Verification Code</label>
                <input type="text" className="form-control" id="verification-code" onChange={ (e) => setCode(e.target.value)}/>
            </div>
            ) : null}
            

            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        </>
  )
}

LoginPage.propTypes = {
    setToken: PropTypes.func.isRequired
}