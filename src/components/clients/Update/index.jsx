import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useRouter } from 'next/router'
import query from "./query";
import mutation from "./mutation";

export default function UpdateClientForm() {
    const router = useRouter();
	const clientId = router?.query?.clientId;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const { data, loading, error } = useQuery(query, {
        skip: !clientId,
        variables: { id: clientId },
        onCompleted: (data) => {
            setName(data.client?.name);
            setEmail(data.client?.email);
            setPhone(data.client?.phone);
        }
    });
    
    const [ updateClient ] = useMutation(mutation, {
        variables: { id: clientId, name, email, phone },
    });

    const onSubmit = async (e) => {
        e.preventDefault();

        if (name === "" || email === "" || phone === "") {
            return alert("Please fill in all fields");
        }

        try {
            await updateClient()
            router.push(`/clients/${clientId}`)
        } catch (err) {
            console.log('UpdateClientForm');
            console.log(err);
        }
    }


    return (
    <>
        <h3>Update Client</h3>
        <form onSubmit={ onSubmit }>
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

            <button type="submit" className="btn btn-secondary">Submit</button>
        </form>
    </>
    )
}
