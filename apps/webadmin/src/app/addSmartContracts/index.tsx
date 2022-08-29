import * as React from 'react';
import { Button, Grid, Input, Typography } from "@mui/material";
import { Box } from "@mui/system";
import leftArrow from '@common/assets/images/leftArrow.svg'
import { useNavigate } from 'react-router-dom';
import { UseCreateSmartContracts } from '@webadmin/api';
import { useSnack } from '@common/hooks';

export default function AddSmartContracts() {
  const navigate = useNavigate();
  const [contract, setContract] = React.useState<string>('')
  const [name, setName] = React.useState<string >('')
  const [symbol, setSymbol] = React.useState<string >('')
  const { mutate } = UseCreateSmartContracts(contract, name, symbol);
  const snack  = useSnack();

  const handleSubmit = () => {
    if (contract.length > 1 && name.length > 1) {
      mutate()
    } else {
      snack('You need to provide a correct Name and Adress', "error");
    }
  }
  return (
    <Box>
      <Grid 
        container
        onClick={() => navigate(-1)}
        sx={{
          cursor:'pointer'
        }}
      >
        <img 
          src={leftArrow} 
          alt="left icon"
          style={{
            marginRight: '1rem'
          }}
        />
        <Typography
          variant="h2"
          sx={{
            color: 'white'
          }}
        >
          Add smart contract
        </Typography>
      </Grid>
      <Box
        sx={{
          maxWidth:'600px'
        }}
      >
        <Box
            sx={{
              marginTop: '2rem'
            }}
          >
            <Typography
              variant='h4'
              color='white'
            >
              Name
            </Typography>
            <Input 
              fullWidth 
              onChange={(e) => setName(e.target.value)}
              sx={{
                background: '#1E293B',
                marginTop: '1rem',
                borderRadius: '10px',
                color: 'white',
                padding: '1rem'
              }}
            />
        </Box>
        <Box
          sx={{
              marginTop: '2rem'
            }}
          >
            <Typography
              variant='h4'
              color='white'
            >
              Adresse du contrat
            </Typography>
            <Input 
              fullWidth 
              onChange={(e) => setContract(e.target.value)}
              sx={{
                background: '#1E293B',
                marginTop: '1rem',
                borderRadius: '10px',
                color: 'white',
                padding: '1rem'
              }}
            />
        </Box>
        <Box
          sx={{
              marginTop: '2rem'
            }}
          >
            <Typography
              variant='h4'
              color='white'
            >
              Symbol
            </Typography>
            <Input 
              fullWidth 
              onChange={(e) => setSymbol(e.target.value)}
              sx={{
                background: '#1E293B',
                marginTop: '1rem',
                borderRadius: '10px',
                color: 'white',
                padding: '1rem'
              }}
            />
        </Box>
        </Box>
      <Button
        variant="contained"
        onClick={() => handleSubmit()}
        sx={{
          background: 'white',
          fontSize: '1.1rem',
          fontWeight: 'bold',
          padding: '.75rem 2.25rem',
          color: 'black',
          borderRadius: '16px',
          marginTop: '2rem'
        }}
        >
          Ajouter
      </Button>
    </Box>
  )
}