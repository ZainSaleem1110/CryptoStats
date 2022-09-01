import { useCallback, useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Tooltip,
  MenuItem,
  Drawer,
  ListItemIcon,
} from '@mui/material';
import Sidebar from './sidebar';
import { Logo } from '@common/components';
import {
  resetUser,
  useDispatch,
} from '@webadmin/store';
import MenuIcon from '@mui/icons-material/Menu';
import SignoutIcon from '@mui/icons-material/ExitToApp';
import DefaultAvatar from '@common/assets/images/defaultAvatar.svg'
import { SearchBar } from '@webadmin/components';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useWindowDimensions } from '@webadmin/hooks';

const Navbar = () => {
  const dispatch = useDispatch();
  const [openSidebar, setOpenSidebar] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { height, width } = useWindowDimensions();


  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toggleDrawer = () => setOpenSidebar(!openSidebar);

  const handleLogout = useCallback(() => {
    dispatch(resetUser());
  }, [dispatch]);

  return (
    <>
      <AppBar 
        elevation={0} 
        sx={{ 
          backgroundColor: '#1E293B',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.2)',
          maxWidth: {
            sm: '100%',
            md: width && width - 250 + 'px',
            lg: width && width - 250 + 'px',
          },
          padding: {
            md: '1rem',
          }
        }}
        >
        <Container>
          <Toolbar
            disableGutters
            sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center', 
                height: '100%',
            }}  
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              sx={{
                display: {
                  sm: 'block',
                  md: 'none',
                },
              }}
              onClick={() => setOpenSidebar(!openSidebar)}
            >
              <MenuIcon />
            </IconButton>
            <SearchBar />
            <Box>
              <Tooltip title="Open Logout">
                <IconButton 
                  onClick={handleOpenUserMenu} 
                  sx={{ p: 0 }}>
                  <Avatar 
                    alt='default avatar'
                    src={DefaultAvatar} 
                    sx={{
                      width: '46px',
                      height: '46px'
                    }}
                  />
                  {anchorElUser ? 
                  <ExpandLessIcon 
                    fontSize="large"
                    sx={{
                      color:'white',
                    }}
                  /> : <ExpandMoreIcon 
                      fontSize="large"
                      sx={{
                        color:'white',
                      }}
                  /> }
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ 
                  mt: '45px',
                }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  sx={{
                    paddingTop: '1rem',
                    paddingBottom: '1rem',
                    justifyContent: 'space-between',
                    border: 0
                  }}
                  onClick={handleLogout}
                >
                  <ListItemIcon>
                    <SignoutIcon />
                  </ListItemIcon>
                  <Typography  
                    variant="h5" 
                    sx={{ 
                      fontWeight: 500,
                      color: 'black'
                    }}>
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer anchor="left" open={openSidebar} onClose={toggleDrawer}>
        <Sidebar />
      </Drawer>
    </>
  );
};
export default Navbar;