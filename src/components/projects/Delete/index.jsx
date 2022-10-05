import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { AiOutlineWarning } from 'react-icons/ai'
import { Box, Button, Dialog, Modal, Typography } from '@mui/material'

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
            <Button variant='contained' color='error' onClick={handleShow}>
                Delete
            </Button>
            <Dialog
                onClose={handleClose}
                open={show}
            >
                <Box
                    padding='2rem'
                    display='flex'
                    justifyContent='center'
                    flexDirection='column'
                >
                    <Typography
                        marginBottom='1rem'
                    >
                        Do you really want to delete this project?
                    </Typography>
                    <Box
                        display='flex'
                        justifyContent='flex-end'
                    >
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button color='error' onClick={handleDelete}>Confirm</Button>
                    </Box>
                </Box>
            </Dialog>
        </>
    )}