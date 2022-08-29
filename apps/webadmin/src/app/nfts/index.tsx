import {
  Typography,
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';
import { UseGetNftList, useRefreshAllNft } from '@webadmin/api';
import { TableInfiniteQuery } from '@common/components';
import { Nft, NftPage } from '@common/types';
import { NftCard, NftSkeleton } from '@webadmin/components';
import { useSnack } from '@common/hooks';

export default function Nfts() {
  const query = UseGetNftList();
  const snack = useSnack();

  const { mutate } = useRefreshAllNft();

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box
          sx={{
            paddingBottom: '17.5%',
          }}
        >
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              variant="h1"
              sx={{
                color: 'white',
              }}
            >
              Nfts
            </Typography>
            <Button
              onClick={() => mutate()}
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'white',
                backgroundColor: '#47DDC2',
                borderRadius: '8px',
                textDecoration: 'none',
                padding: '.5rem 1.25rem',
              }}
            >
              Sync NFT
            </Button>
          </Grid>
          <TableContainer
            component={Paper}
            style={{
              backgroundColor: '#1E293B',
              marginTop: '2rem',
            }}
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      color: '#93989A',
                      border: 0,
                    }}
                  >
                    Nom
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color: '#93989A',
                      border: 0,
                    }}
                  >
                    Evolution
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color: '#93989A',
                      border: 0,
                    }}
                  >
                    Propriétaire
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color: '#93989A',
                      border: 0,
                    }}
                  >
                    Prix
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableInfiniteQuery<Nft, NftPage>
                  id={`Nft`}
                  query={query}
                  field="datas"
                  renderItem={(nft) => <NftCard nft={nft} key={nft.id} />}
                  renderSkeleton={(id) => <NftSkeleton key={id} />}
                  md={12}
                />
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Grid>
    </Grid>
  );
}
