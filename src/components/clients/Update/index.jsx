import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useRouter } from 'next/router'
import query from "./query";
import mutation from "./mutation";
import { Box, Button, TextField, Typography } from "@mui/material";

export default function UpdateClientForm() {
    const router = useRouter();
	const clientId = router?.query?.clientId;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const { data, loading, error } = useQuery(query, {
        skip: !clientId,
        variables: { id: clientId },
        onCompleted: (data) => {
            setName(data.client?.name);
            setEmail(data.client?.email);
            setPhone(data.client?.phone);
        }
    });
    
    const [ updateClient ] = useMutation(mutation, {
        variables: { id: clientId, name, email, phone },
    });

    const onSubmit = async (e) => {
        e.preventDefault();

        if (name === "" || email === "" || phone === "") {
            return alert("Please fill in all fields");
        }

        try {
            await updateClient()
            router.push(`/clients/${clientId}`)
        } catch (err) {
            console.log('UpdateClientForm');
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
                New Client
            </Typography>
            <TextField
                required
                id='name'
                label='Client Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <TextField
                required
                id='phone'
                label='Phone'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                id='email'
                label='Email'
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
