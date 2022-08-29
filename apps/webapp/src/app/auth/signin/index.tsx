import * as React from 'react';
import { Button, Input, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { UseAuth } from '@webadmin/api';
import { useSnack } from '@common/hooks';
import { Icon } from '@common/utils';
import MetamaskIcon from '@common/assets/images/metamask-connect.svg';
import { injected, useMetaMask } from '@webapp/hooks';
import { InjectedConnector } from '@web3-react/injected-connector';
import { setToken, useDispatch } from '@webapp/store';

export default function Signin() {
  const { connect, account } = useMetaMask();
  const dispatch = useDispatch();

  const handleConnect = React.useCallback(
    async (wallet: InjectedConnector) => {
      connect(wallet).then(() => {
        dispatch(
          setToken(
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiMHhlMDEwMjc5NzA2OWI0N2U4ZmVjMTU1M2UwNGYwZWNmYWIwMTJmYjkwIiwiaWQiOiJjZDQzZDNjYy03ZmU4LTRkYjItOGQ2Ny0xYzlhN2E4ZjVmOGUiLCJpYXQiOjE2NTk0NjM2ODh9.9-WseR7OXqf1yjgXtK5QaV4VRhK5TO_rlTGqE1lEMtA'
          )
        );
      });
    },
    [connect, account]
  );

  return (
    <Box
      sx={{
        width: '100%',
        marginBottom: 15,
        background: '#1E293B',
        boxShadow: '0px 4px 20px rgba(50, 50, 71, 0.08)',
        borderRadius: '16px',
        padding: 3,
      }}
    >
      <Typography
        variant="h2"
        style={{
          color: 'white',
          textAlign: 'center',
          fontSize: '2.3rem',
        }}
      >
        Se connecter
      </Typography>
      <Typography
        variant="subtitle1"
        style={{
          color: 'white',
          textAlign: 'center',
          fontWeight: 400,
          paddingTop: '10px',
        }}
      >
        Connecter votre wallet
      </Typography>
      <Box
        sx={{
          marginTop: '1rem',
        }}
      >
        <Button
          onClick={() => handleConnect(injected)}
          variant="connect"
          sx={{ marginBottom: 2 }}
        >
          <Icon src={MetamaskIcon} alt="Metamask" />
          <Typography>MetaMask</Typography>
        </Button>
      </Box>
    </Box>
  );
}
