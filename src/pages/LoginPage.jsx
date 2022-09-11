import { useState } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useMutation } from "@apollo/client";
import { SIGN_IN, VALIDATE_CODE } from "../mutations/userMutations"; // import the mutation



export default function LoginPage({ token, setToken }) {
    const navigate = useNavigate();
    
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ code, setCode ] = useState("");
    const [ payload , setPayload ] = useState(null);
    
    const [ validateCode, { error: validateCodeError } ] = useMutation(VALIDATE_CODE);
    const [ signIn, { error: signInError }] = useMutation(SIGN_IN, {
        variables: { username, password }
    });

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
                    const { data: {validateCode: validateCodeData}} = await validateCode({ variables: {userId: payload.user.id, code}});

                    if (validateCodeData.success) {
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
            { validateCodeError && <div className="alert alert-danger">{ validateCodeError.message }</div> }
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