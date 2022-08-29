import { Box, Grid, Skeleton, Typography } from '@mui/material';
import { Logo } from '@common/components';
import { useGetStats } from '@common/api';
import { Comp } from './comp';

export const PublicLayout = (props: { children: React.ReactNode }) => {
  const { data, status } = useGetStats();
  return (
    <Box>
      <Grid
        container
        alignItems="center"
        sx={{
          minHeight: '100vh',
          height: '100%',
          backgroundColor: '#0F172A',
        }}
      >
        <Grid
          item
          md={6}
          sx={{
            minHeight: '100vh',
            backgroundColor: '#1E293B',
            display: {
              xs: 'none',
              md: 'block',
            },
            height: '100%',
            padding: {
              md: 5,
              lg: 10,
              xl: 20,
            },
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        >
          <Logo withTitle={true} />
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box>
              <Typography
                variant="h1"
                component="h1"
                style={{
                  fontSize: '3.5rem',
                  color: 'white',
                  maxWidth: '450px',
                  marginTop: '7.5vh',
                }}
              >
                Welcome to Cryptostats ! The new plateform stats
              </Typography>
            </Box>
            <Box
              style={{
                marginTop: '6vh',
              }}
            >
              {status === 'loading' && !data
                ? [0, 1, 2].map((e: number) => (
                    <Box style={{ marginTop: '12px' }}>
                      <Skeleton
                        key={e}
                        variant="rectangular"
                        width="100%"
                        height="90px"
                      />
                    </Box>
                  ))
                : data?.map((item: any, index: number) => (
                    <Comp
                      index={index}
                      key={index}
                      name={item.name}
                      price={item.price}
                      symbol={item.symbol}
                      percentChange={item.percentChange24h}
                    />
                  ))}
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            height: '100%',
            padding: {
              xs: 5,
              lg: 10,
              xl: 20,
            },
          }}
        >
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                marginBottom: 2,
                display: {
                  xs: 'block',
                  md: 'none',
                },
              }}
            >
              <Logo />
            </Box>
            {props.children}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PublicLayout;
