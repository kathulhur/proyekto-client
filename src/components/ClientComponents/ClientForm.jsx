import React from 'react'

export default function ClientForm({ onSubmit, name, setName, email, setEmail, phone, setPhone }) {

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
