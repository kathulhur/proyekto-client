import { useState } from "react";
import { useRouter } from "next/router";
import Header from "../../src/components/Header";
import useToken from "../../src/hooks/useToken";
import { useMutation } from "@apollo/client";
import { SIGN_IN, VALIDATE_CODE } from "./mutation"; // import the mutation
import { useEffect } from "react";

export default function LoginPage() {

    const router = useRouter();
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ code, setCode ] = useState("");
    const [ payload , setPayload ] = useState(null);
    
    
    const [ validateCode, { error: validateCodeError } ] = useMutation(VALIDATE_CODE,{ 
        variables: {userId: payload?.user.id, code},
        fetchPolicy: "network-only" 
    });

    const [ signIn, { error: signInError }] = useMutation(SIGN_IN, {
        variables: { username, password },
        fetchPolicy: "network-only"
        
    });

    const onSubmit = async e => {
        e.preventDefault();
        
        if (!payload)
        {
            try {
                const { data } = await signIn({
                    variables: {
                        username,
                        password
                    }
                });
                
                setPayload(data.signIn);
                
                if (!data.signIn.user.twoFactorAuthEnabled) {
                    localStorage.setItem('token', data.signIn.token);
                    router.push("/");
                }
                

            } catch (err) {
                console.log('signIn');
                console.log(err);
            }
        } else {
            try {
                const { data: {validateCode: validateCodeData}} = await validateCode();

                if (validateCodeData.success) {
                    localStorage.setItem('token', payload.token);
                    router.push("/");
                }
            } catch (err) {
                console.log('validateCode')
                console.log(err)
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