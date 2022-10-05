import { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { SIGN_IN, VALIDATE_CODE } from "./mutation"; // import the mutation
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {default as NextLink} from 'next/link'
import Alert from "@mui/material/Alert";
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

export default function SignInPage() {

    const router = useRouter();
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ code, setCode ] = useState('');
    const [ payload , setPayload ] = useState(null);
    
    
    const [ validateCode, { error: validateCodeError } ] = useMutation(VALIDATE_CODE,{ 
        variables: {userId: payload?.user.id, code},
        fetchPolicy: "network-only" 
    });

    const [ signIn, { error: signInError }] = useMutation(SIGN_IN, {
        variables: { username, password },
        fetchPolicy: "network-only"
        
    });

    const handleSubmit = async e => {
        e.preventDefault();
        
        if (!payload)
        {
            try {
                const { data } = await signIn({
                    variables: {
                        username,
                        password
                    }
                });
                
                setPayload(data.signIn);
                
                if (!data.signIn.user.twoFactorAuthEnabled) {
                    localStorage.setItem('token', data.signIn.token);
                    router.push("/");
                }
                

            } catch (err) {
                console.log('signIn');
                // console.log(err);
            }
        } else {
            try {
                const { data: {validateCode: validateCodeData}} = await validateCode();

                if (validateCodeData.success) {
                    localStorage.setItem('token', payload.token);
                    router.push("/");
                }
            } catch (err) {
                console.log('validateCode')
                // console.log(err)
            }
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
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Sign in
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
                    { signInError && (
                        <Alert variant="filled" severity="error">
                            Incorrect Email or Password
                        </Alert>
                        )
                    }
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                        </Grid>
                        <Grid item>
                            <NextLink href="/signup" passHref>
                                <Link variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </NextLink>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}