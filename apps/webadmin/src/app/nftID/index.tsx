import * as React from 'react';
import {
  Grid,
  Typography,
  Button,
  Input,
  FormControl,
  NativeSelect,
  Skeleton,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/system';
import leftArrow from '@common/assets/images/leftArrow.svg';
import { useNavigate } from 'react-router-dom';
import DefaultNft from '@common/assets/images/defaultNft.png';
import { useGetNftFromId, UseUpdateNft } from '@webadmin/api';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useSnack } from '@common/hooks';

export const NftIdSkeleton = () => {
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
              Name
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
              Owner
            </Typography>
            <Skeleton height="100px" />
          </Box>
          <Box
            sx={{
              marginTop: '2rem',
            }}
          >
            <Typography variant="h4" color="white">
              <Skeleton height="100px" />
            </Typography>
            <Grid
              container
              alignItems="center"
              spacing={3}
              sx={{
                marginTop: '0rem',
              }}
            >
              <Grid item xs={4}>
                <Skeleton />
              </Grid>
              <Grid item xs={4}>
                <Skeleton />
              </Grid>
              <Grid item xs={4}>
                <Skeleton />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default function Nftid() {
  const { id } = useParams();
  const nftId = id as string;
  const navigate = useNavigate();

  const { data: dataNft, status, refetch } = useGetNftFromId(nftId);

  const [currency, setCurrency] = React.useState<string | undefined | null>(
    null
  );
  const [price, setPrice] = React.useState<number | string | undefined | null>(
    null
  );
  const [theoreticalPrice, setTheoricalPrice] = React.useState<string | null>(
    null
  );

  const { mutate } = UseUpdateNft(id);
  const snack = useSnack();

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    snack(`Copié !`, 'success');
  };

  React.useEffect(() => {
    refetch();
  }, [nftId, refetch]);
  if (status === 'loading') return <NftIdSkeleton />;

  return (
    <Box>
      <Grid
        container
        onClick={() => navigate('/nfts')}
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
          {dataNft && dataNft.name}
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
            src={dataNft?.image ? dataNft.image : DefaultNft}
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
              Nom du NFT
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
              {dataNft?.name}
            </Typography>
          </Box>
          <Box
            sx={{
              marginTop: '2rem',
            }}
          >
            <Typography variant="h4" color="white">
              Nom de la collection
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
              {dataNft?.Collection.name}
            </Typography>
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
              {dataNft?.Collection?.address}
              <Button
                sx={{
                  color: 'white',
                  marginLeft: '-1rem',
                }}
                onClick={() => copyAddress(dataNft?.Collection?.address || '')}
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
              Propriétaire
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
              {dataNft?.User?.username ||
                dataNft?.User?.address ||
                'Non renseigné'}
            </Typography>
          </Box>
          <Box
            sx={{
              marginTop: '2rem',
            }}
          >
            <Typography variant="h4" color="white">
              Devise
            </Typography>
            <Grid
              container
              alignItems="center"
              spacing={3}
              sx={{
                marginTop: '0rem',
              }}
            >
              <Grid item>
                <FormControl fullWidth>
                  <NativeSelect
                    value={currency || dataNft?.currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    sx={{
                      backgroundColor: '#1E293B',
                      color: 'white',
                      boxShadow: '0px 4px 20px rgba(50, 50, 71, 0.08)',
                      borderRadius: '10px',
                      padding: '1rem',
                    }}
                  >
                    <option value=""></option>
                    {['BTC', 'ETH', 'BNB', 'USDT'].map(
                      (e: string, index: number) => (
                        <option value={e} key={index}>
                          {e}
                        </option>
                      )
                    )}
                  </NativeSelect>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              marginTop: '2rem',
            }}
          >
            <Typography variant="h4" color="white">
              Prix
            </Typography>
            <Grid
              container
              alignItems="center"
              spacing={3}
              sx={{
                marginTop: '0rem',
              }}
            >
              <Grid item>
                <Typography
                  variant="caption"
                  color="white"
                  style={{ paddingLeft: '3px', paddingTop: '3px' }}
                >
                  Prix d'achat
                </Typography>
                <Input
                  placeholder="Prix achat"
                  onChange={(e) => setPrice(e.target.value)}
                  defaultValue={dataNft?.price}
                  sx={{
                    backgroundColor: '#1E293B',
                    color: 'white',
                    boxShadow: '0px 4px 20px rgba(50, 50, 71, 0.08)',
                    borderRadius: '10px',
                    padding: '1rem',
                  }}
                />
              </Grid>
              <Grid item>
                <Typography
                  variant="caption"
                  color="white"
                  style={{ paddingLeft: '3px', paddingTop: '3px' }}
                >
                  Prix théorique
                </Typography>
                <Input
                  placeholder="Prix théorique"
                  defaultValue={dataNft?.theoreticalPrice}
                  onChange={(e) => setTheoricalPrice(e.target.value)}
                  sx={{
                    backgroundColor: '#1E293B',
                    color: 'white',
                    boxShadow: '0px 4px 20px rgba(50, 50, 71, 0.08)',
                    borderRadius: '10px',
                    padding: '1rem',
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <Button
            variant="contained"
            onClick={() => mutate({ currency, theoreticalPrice, price })}
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
