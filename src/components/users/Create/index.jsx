import { useMutation } from "@apollo/client"
import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router"
import { useState } from "react";
import mutation from "./mutation";

export default function CreateUserForm({ redirectPath }) {
    const router = useRouter()

    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")

    const [createUser, { loading, error }] = useMutation(mutation, {
        variables: { username, password },
        onCompleted: () => { router.push(redirectPath) }
    });

    if (loading) return 'Submitting...';
    if (error) return `Error! ${error.message}`;

    const onSubmit = async (e) => {
        e.preventDefault();
        if (username === "" || password === "") {
            return alert("Please fill in all fields");
        }
        try {
            await createUser();
        } catch (err) {
            console.log('CreateUserForm');
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
                label='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                required
                id='password'
                type='password'
                label='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
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
