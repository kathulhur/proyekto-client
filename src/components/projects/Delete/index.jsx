import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { AiOutlineWarning } from 'react-icons/ai'

const mutation = gql`
    mutation DeleteProject($id: ID!) {
        deleteProject(id: $id) {
            id
        }
    }
`

export default function DeleteProjectModal() {

    const router = useRouter();
    const projectId = router.query?.projectId;

    const [show, setShow] = useState(false);
    
    const [deleteProject] = useMutation(mutation, {
        variables: {
            id: projectId
        }
    });

    const handleDelete = async () => {
        try {
            await deleteProject();
            router.push('/projects');
        } catch (err) {
            console.log('Project Page - Delete')
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
                        Delete Project
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Do you really want to delete this project?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <div>
                        <Button onClick={handleDelete} className='me-3'>Confirm</Button>
                        <Button onClick={handleClose}>Cancel</Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )}