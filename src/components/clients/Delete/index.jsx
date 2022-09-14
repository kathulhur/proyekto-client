import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { AiOutlineWarning } from 'react-icons/ai'

const mutation = gql`
    mutation DeleteClient($id: ID!) {
        deleteClient(id: $id) {
            id
        }
    }
`


export default function DeleteClientModal() {

    const router = useRouter();
    const clientId = router.query?.clientId;

    const [show, setShow] = useState(false);
    
    const [deleteClient] = useMutation(mutation, {
        variables: {
            id: clientId
        }
    });

    const handleDelete = async () => {
        try {
            await deleteClient();
            router.push('/clients');
        } catch (err) {
            console.log('Client Page - Delete')
            console.log(err);
        }
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="danger" onClick={handleShow}>
                Delete
            </Button>
            <Modal
                onHide={handleClose}
                show={show}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" className='d-flex align-items-center'>
                        <AiOutlineWarning/>
                        Delete Client
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Do you really want to delete this client?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <div className='d-flex'>
                        <Button onClick={handleDelete} variant='danger' className='me-2'>Confirm</Button>
                        <Button onClick={handleClose}>Cancel</Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )}