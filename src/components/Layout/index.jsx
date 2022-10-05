import Forbidden from '../Forbidden';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import logo from '../../../public/rocket-icon.svg'
import Image from 'next/image';
import { useQuery } from '@apollo/client';
import query from './query'
import { Avatar, LinearProgress, TextField } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunchOutlined'
import HomeIcon from '@mui/icons-material/HomeMaxRounded'
import PeopleIcon from '@mui/icons-material/PeopleOutlineRounded'
import BadgeIcon from '@mui/icons-material/BadgeOutlined'
import { default as NextLink } from 'next/link'
import { useRouter } from 'next/router';
import Link from '@mui/material/Link';
import { useApolloClient } from '@apollo/client';
import LightBulbIcon from '@mui/icons-material/Lightbulb'

const drawerWidth = 240;


export default function Layout({ children }) {
  const router = useRouter();
  const client = useApolloClient();
  const { loading, error, data } = useQuery(query)

  if (loading) return <LinearProgress/>;
  if (error) {
    // console.log(error)
    // console.log('hey')
    router.push('signin')
  }

 
  return (
    <>
    {!loading && !error && (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          { !loading && !error && data?.user && (
            <Box 
              display={'flex'} 
              flexGrow={'1'} 
              justifyContent={'flex-end'} 
              gap={'1rem'}
              alignItems={'center'}
            >
              <Box
                display='flex'
                flexDirection='column'
                alignItems='flex-end'
              >
                <Typography fontSize={'16px'}>
                  {data?.user?.username}
                </Typography>
                <Typography fontSize={'10px'} component={'p'}>
                  {data?.user?.role}
                </Typography>
              </Box>

              <NextLink href={`/users/${data?.user?.id}`} passHref>
                <Link color={'inherit'} underline='none' display={'flex'} flexDirection={'column'} alignItems={'flex-end'}>
                  <Avatar>
                    {data?.user?.username[0]}
                  </Avatar>
                </Link>
              </NextLink>
              <NextLink href="/signin" passHref>
                  <Link color={'inherit'} underline='none' onClick={ () => { localStorage.clear(); client.clearStore(); } }>
                      Logout
                  </Link>
              </NextLink>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
        >
        <Toolbar>
          <Box
            display={'flex'}
            flexGrow={'1'}
            justifyContent={'center'}
            columnGap={'1rem'}
            fontWeight={'bold'}
          >
            <Image
                sx={{}}
                src={logo} 
                alt="logo" 
                />
            PROYEKTO
          </Box>
        </Toolbar>
        <Divider />
        <List
        >
          <ListItem>
            <NextLink href={'/'} passHref>
              <ListItemButton selected={router.pathname === '/'}>
                  <ListItemIcon>
                      <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Dashboard'}/>
              </ListItemButton>
            </NextLink>
          </ListItem>
          <ListItem>
            <NextLink href={'/projects'} passHref>
              <ListItemButton selected={router.pathname === '/projects'}>
                  <ListItemIcon>
                      <RocketLaunchIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Projects'}/>
              </ListItemButton>
            </NextLink>
          </ListItem>
          <ListItem>
            <NextLink href={'/clients'} passHref>
              <ListItemButton selected={router.pathname === '/clients'}>
                  <ListItemIcon>
                      <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Clients'}/>
              </ListItemButton>
            </NextLink>
          </ListItem>
          <ListItem>
              <NextLink href={'/users'} passHref>
                <ListItemButton selected={router.pathname === '/users'}>
                    <ListItemIcon>
                        <BadgeIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Users'}/>
                </ListItemButton>
              </NextLink>
          </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem>
              <Typography variant='subtitle2'>
                My Projects
              </Typography>
            </ListItem>
            { loading 
              ? <LinearProgress/>
              : !error && data?.projects?.filter((project) => (project.status === 'PROGRESS')).map( (project) => 
              <ListItem 
                key={project?.id}
              >
                <NextLink 
                  href={`/projects/${project?.id}`}
                  passHref
                >
                  <ListItemButton>
                      <ListItemIcon>
                          <CircleIcon color='primary' fontSize='small'/>
                      </ListItemIcon>
                      <ListItemText>
                        <Typography
                          variant='subtitle2'
                          component={'span'}
                          >
                          {project?.name}
                        </Typography>
                      </ListItemText>
                  </ListItemButton>
                </NextLink>
              </ListItem>
                )
              }
        </List>
        <Divider />
        <Box 
          display='flex' 
          flexDirection={'column'} 
          alignItems={'center'} 
          border={'1px'} 
          borderRadius='16px'
          backgroundColor='#F5F5F5'
          margin={'2rem'}
          marginTop={'4rem'}
          padding={'1rem'}
          paddingBottom={'0px'}
        >
            <Box
              display='flex' 
              flexDirection={'column'} 
              alignItems={'center'}
              sx={{transform: 'translateY(-45px)'}}
            >
              <Avatar sx={{width: '64px', height: '64px', backgroundColor: '#FCD64A60'}}>
                <LightBulbIcon sx={{color: '#FBCB18'}}/>
              </Avatar>
              <Typography variant='subtitle2' fontSize={'14px'} marginY={'1rem'}>
                Thoughts Time
              </Typography>
              <Typography variant='body2' color={'#787486'} fontSize={'12px'} textAlign='center'>
                We don't have any notice for you, till then you can share thoughts with your peers.
              </Typography>
            </Box>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
        <Toolbar />
        { children }
      </Box>
    </Box>
    )}
    </>
  );
}
