import { useState } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useMutation } from "@apollo/client";
import { SIGN_IN } from "../mutations/userMutations"; // import the mutation


async function validate(code, secret) {
    const encodedParams = new URLSearchParams();
    encodedParams.append("secret", secret);
    encodedParams.append("code", code);

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': '482774802cmsh9f7a363a2d2f393p14409cjsn0bbd5071a76b',
            'X-RapidAPI-Host': 'google-authenticator.p.rapidapi.com'
        },
        body: encodedParams
    };

    return fetch(`https://google-authenticator.p.rapidapi.com/validate/?code=${ code }&secret=${ secret }`, options)
        .then(response => response.text())
        .catch(err => console.error(err));
}

export default function LoginPage({ token, setToken }) {
    const navigate = useNavigate();

    const [ signIn, { error } ] = useMutation(SIGN_IN);
    

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
                    const isValid = await validate(code, payload.user.secretCode);
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
            { error && <div className="alert alert-danger">{ error.message }</div> }
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