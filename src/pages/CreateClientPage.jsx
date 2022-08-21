import { useState } from "react";
import { CREATE_CLIENT } from "../mutations/clientMutations";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Header from "../components/Header";

export default function CreateClientPage() {
    
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [ addClient ] = useMutation(CREATE_CLIENT, {
        variables: { name, email, phone },
        refetchQueries: ["getClients"], // idk why is this required but not the case in the other mutation (editClient)
        onCompleted: () => navigate('/clients')
    });

    const onSubmit = (e) => {
        e.preventDefault();

        if (name === "" || email === "" || phone === "") {
            return alert("Please fill in all fields");
        }

        addClient(name, email, phone);
    }


    return (
    <>
        <Header />
        <h3>Create Client</h3>
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
