import { Box } from '@mui/material';
import { useLocation } from 'react-router';
import RankingIcon from '@common/assets/images/ranking.svg'
import WalletIcon from '@common/assets/images/wallet.svg'
import { Logo } from '@common/components';


export const Sidebar = () => {
  const location = useLocation().pathname;


  return (
    <Box sx={{ 
      width: 250,
      backgroundColor: '#1E293B',
      minHeight: '100vh',
      height: '100%',
      display:'flex',
      flexDirection:'column',
      position: 'fixed',
      borderRight: '1px solid rgba(255, 255, 255, 0.2)',
    }}>
      <Box
        sx={{
          padding: '1.5rem',
          paddingBottom: '2.2rem',
          display: {
            xs: 'none',
            sm: 'block',
          },
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <Logo withTitle={true} />
      </Box>
      <Box
          sx={{
            padding: '.75rem 1rem',
            backgroundColor: location === '/' ? '#47ddc214' : null,
            borderRadius: '10px',
            width: '90%',
            margin: '0 auto',
            marginTop: '1.5rem',
          }}
        >
          <a 
            href="/"
            style={{
              textDecoration:'none',
              display:'flex',
              alignItems:'center',
              color: location === '/' ? '#47DDC2' : 'white',
              fontWeight: location === '/' ? 600 : 400, 
            }}
          >
            <img 
              src={WalletIcon} 
              alt="Home Icon" 
              style={{
                marginRight: '.75rem'
              }}
            />
            Smart contracts
          </a>
        </Box>
        <Box
          sx={{
            padding: '.75rem 1rem',
            backgroundColor: location === '/nfts' ? '#47ddc214' : null,
            borderRadius: '10px',
            width: '90%',
            margin: '0 auto',
            marginTop: '1rem',
            marginBottom: '1rem',
          }}
        >
          <a 
            href="/nfts"
            style={{
              textDecoration:'none',
              display:'flex',
              alignItems:'center',
              color: location === '/nfts' ? '#47DDC2' : 'white',
              fontWeight: location === '/nfts' ? 600 : 400, 
            }}
          >
            <img 
              src={RankingIcon} 
              alt="Ranking Icon" 
              style={{
                marginRight: '.75rem'
              }}
            />
            Nfts
          </a>
        </Box>
        <Box
          sx={{
            padding: '.75rem 1rem',
            backgroundColor: location === '/users' ? '#47ddc214' : null,
            borderRadius: '10px',
            width: '90%',
            margin: '0 auto'
          }}
        >
          <a 
            href="/users"
            style={{
              textDecoration:'none',
              display:'flex',
              alignItems:'center',
              color: location === '/users' ? '#47DDC2' : 'white',
              fontWeight: location === '/users' ? 600 : 400, 
            }}
          >
            <img 
              src={WalletIcon} 
              alt="Wallet Icon" 
              style={{
                marginRight: '.75rem'
              }}
            />
            Users
          </a>
        </Box>
    </Box>
  );
};

export default Sidebar;
