import { useState } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

async function loginUser(credentials) {
    return fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }


export default function LoginPage({ setToken }) {
    const navigate = useNavigate();

    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");

    const onSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        });
        setToken(token);
        navigate("/")
    }

      
    return (
        <>
        <Header/>
        <div className='mt-5'>
            <h3>Login</h3>
            <form onSubmit={ onSubmit }>
            <div className="mb-3">
                <label className="form-label">Username</label>
                <input type="text" className="form-control" id="username" onChange={ (e) => setUsername(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" id="password" onChange={ (e) => setPassword(e.target.value)}/>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        </>
  )
}

LoginPage.propTypes = {
    setToken: PropTypes.func.isRequired
}