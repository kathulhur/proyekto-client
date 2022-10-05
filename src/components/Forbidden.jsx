import NextLink from "next/link"
import BlockRoundedIcon from '@mui/icons-material/BlockRounded'
import { Box, Link, Typography } from "@mui/material"
import { useApolloClient } from "@apollo/client"
export default function Forbidden() {
    const client = useApolloClient();

    const handleSignOut = () => {
        client.clearStore()
        localStorage.clear()
    }

    return (
        <>
        <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
        >
            <BlockRoundedIcon fontSize="large" />
            <Typography>
                Sorry you are not allowed to access this content.
            </Typography>
            You can
            <NextLink href="/signin" passHref>
                <Link 
                    onClick={handleSignOut}
                >Sign in with another account</Link>
            </NextLink>
            or
            <NextLink href="/" passHref>
                <Link>Go back</Link>
            </NextLink>
        </Box>
        </>
    )
}
