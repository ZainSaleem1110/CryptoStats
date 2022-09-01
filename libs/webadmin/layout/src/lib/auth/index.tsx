import { Box, Container } from '@mui/material';
import Navbar from './navbar';
import Sidebar from './sidebar';

export const AuthLayout = (props: {
  children: React.ReactNode,
}) => {

  return (
    <>
      <Box sx={{ width: "100%", height: "100vh", overflow: "hidden", display: "flex" }}>
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
        <Box sx={{width:"100%",height:"100vh",overflowY:"auto"}}>
          <Navbar />
          <Box
            sx={{
              display: 'flex',
              justifyContent:"center",
              backgroundColor: '#0F172A',
              minHeight: '100vh',
              paddingTop: '4rem',
              width: "100%"
            }}
          >
            <Box
              sx={{
                flexGrow: 1,
                padding: '5%',
                height: '100%',
                marginTop: '1rem',
                overflowX: 'hidden',
                width: '100%',
              }}
            >
              <Container sx={{ minHeight: '100vh' }}>{props.children}</Container>
            </Box>
          </Box>

        </Box>

      </Box>
    </>
  );
};

export default AuthLayout;
