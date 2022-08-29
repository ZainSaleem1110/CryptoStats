import * as React from 'react';
import { Grid, Input, Typography, Button, Skeleton } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/system';
import leftArrow from '@common/assets/images/leftArrow.svg';
import { useNavigate } from 'react-router-dom';
import DefaultNft from '@common/assets/images/defaultNft.png';
import {
  useGetSmartContractFromId,
  useUpdateSmartContract,
} from '@webadmin/api';
import { useSnack } from '@common/hooks';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export const SmartContractIdSkeleton = () => {
  return (
    <Box>
      <Grid container>
        <img
          src={leftArrow}
          alt="left icon"
          style={{
            marginRight: '1rem',
          }}
        />
        <Typography
          variant="h2"
          sx={{
            color: 'white',
          }}
        >
          Add Nft
        </Typography>
      </Grid>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{
          marginTop: '2.5rem',
        }}
      >
        <Grid item xs={12} md={6} lg={5}>
          <Skeleton variant="rectangular" width="100%" height="500px" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              marginTop: '2rem',
            }}
          >
            <Typography variant="h4" color="white">
              Nom
            </Typography>
            <Skeleton height="100px" />
          </Box>
          <Box
            sx={{
              marginTop: '2rem',
            }}
          >
            <Typography variant="h4" color="white">
              Adresse du contrat
            </Typography>
            <Skeleton height="100px" />
          </Box>
          <Box
            sx={{
              marginTop: '2rem',
            }}
          >
            <Typography variant="h4" color="white">
              Symbol
            </Typography>
            <Skeleton height="100px" />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default function SmartContractId() {
  const { id } = useParams();
  const nftId = id as string;
  const navigate = useNavigate();

  const { data: dataSmart, status, refetch } = useGetSmartContractFromId(nftId);

  const [name, setName] = React.useState<string | undefined | null>();
  const [symbol, setSymbol] = React.useState<string | undefined | null>();

  const { mutate } = useUpdateSmartContract(id);

  const snack = useSnack();
  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    snack(`Copié !`, 'success');
  };

  React.useEffect(() => {
    refetch();
  }, [nftId, refetch]);

  if (status === 'loading') return <SmartContractIdSkeleton />;

  return (
    <Box>
      <Grid
        container
        onClick={() => navigate('/')}
        sx={{
          cursor: 'pointer',
        }}
      >
        <img
          src={leftArrow}
          alt="left icon"
          style={{
            marginRight: '1rem',
          }}
        />
        <Typography
          variant="h2"
          sx={{
            color: 'white',
          }}
        >
          {dataSmart && dataSmart.name}
        </Typography>
      </Grid>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{
          marginTop: '2.5rem',
        }}
      >
        <Grid item xs={12} md={6} lg={4}>
          <img
            src={dataSmart?.profileImage ? dataSmart.profileImage : DefaultNft}
            alt="#"
            style={{
              borderRadius: 20,
              width: '100%',
            }}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={7}>
          <Box
            sx={{
              marginTop: '2rem',
            }}
          >
            <Typography variant="h4" color="white">
              Nom
            </Typography>
            <Input
              fullWidth
              defaultValue={dataSmart?.name}
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{
                background: '#1E293B',
                marginTop: '1rem',
                borderRadius: '10px',
                color: 'white',
                padding: '1rem',
                input: {
                  WebkitTextFillColor: 'white !important',
                },
              }}
            />
          </Box>
          <Box
            sx={{
              marginTop: '2rem',
            }}
          >
            <Typography variant="h4" color="white">
              Adresse du contrat
            </Typography>
            <Typography
              sx={{
                fontSize: '15px',
                fontWeight: 400,
                color: '#E2E8F0',
                display: 'flex',
                alignItems: 'center',
                marginTop: '0.1rem',
              }}
            >
              {dataSmart?.address}
              <Button
                sx={{
                  color: 'white',
                  marginLeft: '-1rem',
                }}
                onClick={() => copyAddress(dataSmart?.address || '')}
              >
                <ContentCopyIcon
                  fontSize="small"
                  sx={{
                    width: '15px',
                  }}
                />
              </Button>
            </Typography>
          </Box>
          <Box
            sx={{
              marginTop: '2rem',
            }}
          >
            <Typography variant="h4" color="white">
              Symbol
            </Typography>
            <Input
              fullWidth
              defaultValue={dataSmart?.symbol}
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              sx={{
                background: '#1E293B',
                marginTop: '1rem',
                borderRadius: '10px',
                color: 'white',
                padding: '1rem',
                input: {
                  WebkitTextFillColor: 'white !important',
                },
              }}
            />
          </Box>
          <Button
            variant="contained"
            onClick={() => mutate({ name, symbol })}
            sx={{
              color: 'black',
              borderRadius: '12px',
              backgroundColor: 'white',
              fontWeight: 'bold',
              padding: '.5rem 2rem',
              fontSize: '1.1rem',
              marginTop: '2rem',
            }}
          >
            Modifier
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
