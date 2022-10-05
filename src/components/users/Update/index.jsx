import { useState } from "react"
import { useRouter } from 'next/router'
import { useQuery, useMutation } from "@apollo/client"
import mutation from "./mutation"
import query from "./query"
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"

export default function UpdateUserForm() {
    const router = useRouter()
    const userId = router?.query?.userId

    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ role, setRole ] = useState('')
    const [ twoFactorAuthEnabled, setTwoFactorAuthEnabled ] = useState('')

    const { data, loading, error } = useQuery(query, {
        skip: !userId,
        variables: { id: userId },
        onCompleted: (data) => {
            setUsername(data.user?.username)
            setPassword(data.user?.password)
            setRole(data.user?.role)
            setTwoFactorAuthEnabled(data.user?.twoFactorAuthEnabled)
        }
    });

    const [updateUser] = useMutation(mutation, {
        variables: { id: userId, username, password, twoFactorAuthEnabled, role},
        onCompleted: () => router.push(`/users/${userId}`)
    });


    const onSubmit = async (e) => {
        e.preventDefault();
        if (username === "" || password === "") {
            return alert("Please fill in all fields");
        }

        try {
            await updateUser();
        } catch (err) {
            console.log('updateUserForm');
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
                Update User
            </Typography>
            <TextField
                required
                id='username'
                label='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                required
                id='password'
                label='Password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <FormGroup
                sx={{
                    rowGap: '2rem',
                    marginY: '1rem'
                }}
            >
                <FormControl>
                    <InputLabel id='role-label'>Role</InputLabel>
                    <Select
                        labelId='role-label'
                        value={role}
                        label='Role'
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <MenuItem value='USER'>User</MenuItem>
                        <MenuItem value='ADMIN'>Admin</MenuItem>
                    </Select>
                </FormControl>
                <FormControlLabel
                    control={<Checkbox />}
                    label='Two Factor Auth Enabled'
                />
            </FormGroup>
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
