import { Box, Container } from '@mui/material';
import Navbar from './navbar';
import Sidebar from './sidebar';

export const AuthLayout = (props: { 
  children: React.ReactNode,
}) => {

  return (
    <>
      <Navbar />
      <Box
        sx={(theme) => ({
          backgroundColor: 'white',
          display: 'none',
          [theme.breakpoints.up('md')]: {
            display: 'block',
          },
        })}
      >
        <Sidebar />
      </Box>
      <Box
        sx={{
          display: 'flex',
          backgroundColor: '#0F172A',
          minHeight: '100%',
          paddingTop: '4rem',
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            padding: '5%',
            height: '100%',
            marginTop: '1rem',
            marginLeft: '250px'
          }}
        >
          <Container sx={{ minHeight: '100vh' }}>{props.children}</Container>
        </Box>
      </Box>
    </>
  );
};

export default AuthLayout;
