import { useRouter } from 'next/router'
import { useMutation } from "@apollo/client";
import mutation from "./mutation";
import query from "./query";
import { useState } from 'react'
import { useQuery } from '@apollo/client'
import Spinner from '../../Spinner'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';


export default function CreateProjectForm() {
    const router = useRouter()

    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ status, setStatus ] = useState('NEW');
    const [ clientId, setClientId ] = useState('');

    const { loading, error, data } = useQuery(query, {
        onCompleted: (data) => {
            setClientId(data?.clients[0]?.id)
        }
    })
    

    const [ createProject ] = useMutation(mutation, {
        variables: { clientId, name, description, status },
        onCompleted: () => router.push('/projects')
    });
    
    if (loading) return <Spinner/>
    if (error) return <p>Something Went Wrong</p>

    
    const onSubmit = async (e) => {
        e.preventDefault();

        if (name === '' || description === '' || status === '' || clientId === '') {
            return alert('Please fill in all fields');
        }
        try {
            await createProject();

        } catch(err) {
            console.log('CreateProjectForm');
            console.log(err);
        }

    };

    return (
    <>
        <Box
            component='form'
            onSubmit={onSubmit}
            autoComplete='off'
            padding='2rem'
            display='flex'
            flexDirection='column'
            alignItems='center'
            sx={{
                '& .MuiTextField-root': { m: 1, width: '50ch' },
            }}

        >
            <Typography
                variant='h3'
                component='h2'
                mb='4rem'
            >
                New Project
            </Typography>
            <TextField
                required
                id='name'
                label='Project Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <TextField
                required
                id="description"
                label="Description"
                onChange={(e) => setDescription(e.target.value)}
                multiline
                rows={4}
            />
            <Box 
                display='flex'
                justifyContent='flex-start'
                columnGap={'2rem'}
                marginY={'2rem'}
            >
                <FormControl>
                    <InputLabel id='status-label'>Status</InputLabel>
                    <Select
                        id="status"
                        value={status}
                        label='status'
                        labelId="status-label"
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <MenuItem value={'NEW'}>New</MenuItem>
                        <MenuItem value={'PROGRESS'}>In Progress</MenuItem>
                        <MenuItem value={'COMPLETED'}>Completed</MenuItem>
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel id='client-label'>Client</InputLabel>
                    <Select
                        id="client"
                        value={clientId}
                        label='status'
                        labelId="status-label"
                        onChange={(e) => setClientId(e.target.value)}
                    >
                        { !loading && !error && data?.clients?.map((client) => (
                            <MenuItem key={client.id} value={client.id}>{client.name}</MenuItem>
                        ))
                        }
                    </Select>
                </FormControl>
            </Box>
            <Button
                size='large'
                variant='contained'
                type='submit'
            >
                Submit
            </Button>

        </Box>
    </>
    )
}
