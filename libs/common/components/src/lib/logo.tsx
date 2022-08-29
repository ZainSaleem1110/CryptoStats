import { Typography } from '@mui/material';
import LogoImage from '@common/assets/images/logo.svg';

export const Logo = (props: { withTitle?: boolean }) => {
  return (
    <a 
      href='/' 
      style={{ 
        display: 'flex', 
        alignItems: 'center' 
      }}>
      <img src={LogoImage} alt="Logo" />
      {props.withTitle === true ? (
        <Typography
          variant="h4"
          sx={{
            color:'white',
            marginLeft: 1
          }}
        >
          Cryptostats
        </Typography>
      ) : null}
    </a>
  );
};

export default Logo;
