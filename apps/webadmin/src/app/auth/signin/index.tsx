import * as React from 'react';
import { Button, Input, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { UseAuth } from '@webadmin/api';
import { useSnack } from '@common/hooks';

export default function Signin() {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const { mutate, status } = UseAuth(email, password);
  const snack = useSnack();

  const handleSubmit = () => {
    if (email.length > 1 && password.length > 1) {
      mutate();
    } else {
      snack('Merci de renseigner un email et un mot de passe', 'error');
    }
  };

  React.useEffect(() => {
    if (status === 'loading') {
      snack('Connexion en cours...', 'info');
    }
  }, [status]);

  return (
    <Box
      sx={{
        maxWidth: '450px',
        width: '100%',
      }}
    >
      <Typography
        variant="h1"
        style={{
          color: 'white',
          textAlign: 'center',
          fontSize: '3.5rem',
        }}
      >
        Sign in
      </Typography>

      <Box
        sx={{
          marginTop: '4rem',
        }}
      >
        <Box>
          <Typography variant="h4" color="white">
            Email adress
          </Typography>
          <Input
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              background: '#1E293B',
              marginTop: '1rem',
              borderRadius: '10px',
              color: 'white',
              input: { color: 'white' },
              padding: '1rem',
            }}
          />
        </Box>
        <Box
          sx={{
            marginTop: '2rem',
          }}
        >
          <Typography variant="h4" color="white">
            Password
          </Typography>
          <Input
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            sx={{
              background: '#1E293B',
              marginTop: '1rem',
              borderRadius: '10px',
              color: 'white',
              input: { color: 'white' },
              padding: '1rem',
            }}
          />
        </Box>
        <Box
          sx={{
            textAlign: 'center',
            marginTop: 15,
          }}
        >
          <Button
            variant="contained"
            onClick={() => handleSubmit()}
            sx={{
              background: '#47DDC2',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              padding: '.75rem 2.25rem',
            }}
          >
            Sign in
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
