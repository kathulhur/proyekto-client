import { useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_CLIENT } from "../../mutations/clientMutations";
import { useNavigate } from "react-router-dom";

export default function EditClientForm({ client }) {
    const navigate = useNavigate();

    const [name, setName] = useState(client.name);
    const [email, setEmail] = useState(client.email);
    const [phone, setPhone] = useState(client.phone);
    
    const [ updateClient ] = useMutation(EDIT_CLIENT, {
        variables: { id: client.id, name, email, phone },
        onCompleted: () => navigate('/clients')
    });

    const onSubmit = (e) => {
        e.preventDefault();

        if (name === "" || email === "" || phone === "") {
            return alert("Please fill in all fields");
        }

        updateClient(client.id, name, email, phone);
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
