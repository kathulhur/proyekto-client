import { useState } from "react"
import { useMutation } from "@apollo/client"
import query from "./query"
import mutation from "./mutation"
import { useQuery } from "@apollo/client"
import { useRouter } from "next/router"
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"

export default function UpdateProjectForm() {
    const router = useRouter();
    const projectId = router.query?.projectId;

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('');
    const [clientId, setClientId] = useState('')

    const { loading, error, data } = useQuery(query, {
            skip: !projectId,
            variables: { id: projectId },
            onCompleted: (data) => {
                setName(data.project.name)
                setDescription(data.project.description)
                setStatus(data.project.status)
                setClientId(data.project.client.id)
            }
        }
    )

    const [ editProject ] = useMutation(mutation, {
        variables: {
            id: projectId,
            name,
            description,
            status,
            clientId
        },
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        if (name === "" || description === "" || status === "") {
            return alert("Please fill in all fields");
        }
        try {
            await editProject();
            router.push(`/projects/${projectId}`);
        } catch (err) {
            console.log('UpdateProjectForm Component')
            console.log(err);
        }
    }

    return (
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
                New User
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
                value={description}
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
    )
}
