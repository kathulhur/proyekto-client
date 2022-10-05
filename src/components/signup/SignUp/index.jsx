import { useMutation } from "@apollo/client"
import { Avatar, Box, Button, Grid, LinearProgress, Link, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router"
import { useState } from "react";
import Container from "@mui/material/Container";
import mutation from "./mutation";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import {default as NextLink} from 'next/link'

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://kathulhudev.me">
          PROYEKTO
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}


export default function CreateUserForm({ redirectPath }) {
    const router = useRouter()

    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")

    const [createUser, { loading, error }] = useMutation(mutation, {
        variables: { username, password },
        onCompleted: () => { router.push(redirectPath) }
    });

    if (loading) return <LinearProgress/>;
    if (error) return `Error! ${error.message}`;

    const handleSubmit = async (e) => {
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
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockRoundedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Sign up
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign up
                    </Button>
                    <Grid container>
                        <Grid item>
                            <NextLink href="/signin" passHref>
                                <Link variant="body2">
                                    {"Already have an account? Sign In"}
                                </Link>
                            </NextLink>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    )
}