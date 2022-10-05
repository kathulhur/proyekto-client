import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Divider from "@mui/material/Divider"
import { Avatar, Chip, Link } from "@mui/material"
import { default as NextLink } from 'next/link'
export default function ProjectCard({ project }) {
    return (
        <>
            <Paper
                elevation={1}
                sx={{ 
                    padding: '2rem', 
                    backgroundColor: 'rgb(245, 245, 245)', 
                    marginY: '2rem' 
                }}
            >
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} marginBottom={'1rem'}>
                    <NextLink
                        href={`projects/${project?.id}`}
                        passHref
                    >
                        <Link
                            underline='none'
                        >
                            <Typography
                                variant={'h4'}
                                component={'h2'}
                                >
                                { project?.name || 'Google Developer Website' }
                                <Chip
                                    label={project?.status}
                                    color='success'
                                    variant='outlined'
                                    style={{marginLeft: '1rem'}}
                                    
                                    />
                            </Typography>
                        </Link>
                    </NextLink>
                    
                    <Box display={'flex'} alignItems={'center'}>
                        <Box 
                            display={'flex'} 
                            flexDirection={'column'} 
                            alignItems={'end'}
                            marginRight={'1rem'}
                        >
                            <Typography variant="subtitle1">
                                {project?.client?.name || 'Jared Ken'}
                            </Typography>
                            <Typography variant="body2">
                                {project?.client?.address || 'Sampaloc, Manila'}
                            </Typography>
                        </Box>
                        <Divider flexItem orientation="vertical"/>
                        <Box marginLeft={'1rem'}>
                            <Avatar alt={'Picture of the client'}>C</Avatar>
                        </Box>
                    </Box>
                </Box>
                <Divider/>
                <Typography 
                    marginTop={'1rem'}
                    variant={'body1'}
                    component={'p'}  
                >
                    {project?.description || 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus a amet praesentium repudiandae, nostrum asperiores mollitia nisi ex quasi rerum culpa similique aspernatur rem molestias, eligendi doloribus? Eaque, fugiat dignissimos?'}
                </Typography>
            </Paper>
        </>
    )
}