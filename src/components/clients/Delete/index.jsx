import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Box, Button, Dialog, Typography } from '@mui/material'

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
                        Do you really want to delete this client?
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