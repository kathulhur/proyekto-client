import React from 'react'
import Layout from '../src/components/Layout'
import Box from '@mui/material/Box'
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded'
export default function Home() {

    return (
        <Box
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            marginTop='4rem'
        >
            <ConstructionRoundedIcon fontSize='large'/>
            <h2>This page is under development</h2>
        </Box>
    )
}


Home.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
