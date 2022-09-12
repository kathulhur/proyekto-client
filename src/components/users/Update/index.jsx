import { useState } from "react"
import { useRouter } from 'next/router'
import { useQuery, useMutation } from "@apollo/client"
import mutation from "./mutation"
import query from "./query"

export default function UpdateUserForm() {
    const router = useRouter()
    const userId = router?.query?.userId

    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ role, setRole ] = useState('')
    const [ twoFactorAuthEnabled, setTwoFactorAuthEnabled ] = useState('')

    const { data, loading, error } = useQuery(query, {
        skip: !userId,
        variables: { id: userId },
        onCompleted: (data) => {
            setUsername(data.user?.username)
            setPassword(data.user?.password)
            setRole(data.user?.role)
            setTwoFactorAuthEnabled(data.user?.twoFactorAuthEnabled)
        }
    });

    const [updateUser] = useMutation(mutation, {
        variables: { id: userId, username, password, twoFactorAuthEnabled, role},
        onCompleted: () => router.push(`/users/${userId}`)
    });


    const onSubmit = async (e) => {
        e.preventDefault();
        if (username === "" || password === "") {
            return alert("Please fill in all fields");
        }

        try {
            await updateUser();
        } catch (err) {
            console.log('updateUserForm');
            console.log(err);
        }
    }

    return (
        <div className='mt-5'>
            <h3>Update User</h3>
            <form onSubmit={ onSubmit }>
            <div className="mb-3">
                <label className="form-label">Username</label>
                <input type="text" className="form-control" id="name" value={username} onChange={ (e) => setUsername(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" id="password" value={password} onChange={ (e) => setPassword(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Status</label>
                <select className="form-select" aria-label="Default select example" value={role} onChange={ (e) => setRole(e.target.value)}>
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
