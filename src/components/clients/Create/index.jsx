import { useState } from 'react';
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import { useRouter } from 'next/router'

export default function CreateClientForm() {
    const [name , setName] = useState('')
    const [email , setEmail] = useState('')
    const [phone , setPhone] = useState('')
    const router = useRouter();

    const [createClient] = useMutation(mutation,{
        variables: { name, email, phone },
        onCompleted: () => { router.push('/clients') }
    })

    const onSubmit = async (e) => {
        e.preventDefault();
        if (name === "" || email === "" || phone === "") {
            return alert("Please fill in all fields");
        }
        try {
            await createClient();
        } catch (err) {
            console.log('CreateClientForm');
            console.log(err);
        }
    }
    

    return (
        <form onSubmit={onSubmit}>
            <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" id="name" value={name} onChange={ (e) => setName(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" id="email" value={email} onChange={ (e) => setEmail(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Phone</label>
                <input type="text" className="form-control" id="phone" value={phone} onChange={ (e) => setPhone(e.target.value)}/>
            </div>

            <button type="submit" data-bs-dismiss="modal" className="btn btn-secondary">Submit</button>
        </form>
)
}
