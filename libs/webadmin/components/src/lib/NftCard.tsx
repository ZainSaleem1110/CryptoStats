import { Box, Skeleton, TableCell, TableRow, Button } from '@mui/material';
import { Nft } from '@common/types';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useNavigate } from 'react-router-dom';
import EthIcon from '@common/assets/images/ETH-ICON.png';
import BtcIcon from '@common/assets/images/BTC-ICON.png';
import { NftItemSearch } from './item/NftItem';

export const NftSkeleton = () => {
  return (
    <TableRow>
      <TableCell
        sx={{
          border: 0,
        }}
      >
        <Skeleton />
      </TableCell>
      <TableCell
        align="right"
        sx={{
          border: 0,
        }}
      >
        <Skeleton />
      </TableCell>
      <TableCell
        align="right"
        sx={{
          border: 0,
        }}
      >
        <Skeleton />
      </TableCell>
      <TableCell
        align="right"
        sx={{
          border: 0,
        }}
      >
        <Skeleton />
      </TableCell>
      <TableCell
        align="right"
        sx={{
          border: 0,
        }}
      >
        <Skeleton />
      </TableCell>
    </TableRow>
  );
};

interface NftCardProps {
  nft: Nft;
}
export function NftCard({ nft }: NftCardProps) {
  const navigate = useNavigate();

  return (
    <TableRow
      key={nft.id}
      onClick={() => navigate(`/nft/${nft.id}`, { replace: true })}
      sx={{
        cursor: 'pointer',
        '&:hover': {
          opacity: 0.5,
        },
      }}
    >
      <TableCell
        align="right"
        component="th"
        scope="row"
        sx={{
          borderBottom: '1px solid#ffffff14',
        }}
      >
        <NftItemSearch
          key={nft.id}
          image={nft.image}
          tokenId={nft.tokenId}
          address={nft.Collection.address}
          collectionName={nft.Collection.name}
          name={nft.name}
          id={nft.id}
        />
      </TableCell>
      <TableCell
        align="right"
        sx={{
          borderBottom: '1px solid#ffffff14',
          color:
            nft.percentChange && nft.percentChange.toString().startsWith('-')
              ? '#F65556'
              : '#22C36B',
        }}
      >
        {nft.percentChange &&
          nft.percentChange.toString().startsWith('-') &&
          `${Number(nft.percentChange).toFixed(2)} %`}
        {nft.percentChange &&
          !nft.percentChange.toString().startsWith('-') &&
          `+${Number(nft.percentChange).toFixed(2)} %`}
        {nft.percentChange === null ? (
          <p style={{ color: '#CFD2CF' }}>0%</p>
        ) : null}
      </TableCell>
      <TableCell
        align="right"
        sx={{
          color: 'white',
          borderBottom: '1px solid#ffffff14',
        }}
      >
        {nft.User && nft.User.username && nft.User.username}
      </TableCell>
      <TableCell
        align="right"
        sx={{
          color: 'white',
          borderBottom: '1px solid#ffffff14',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          {nft.price} {nft.currency ? `(${nft.currency})` : ''}
        </Box>
      </TableCell>
      <TableCell
        align="right"
        sx={{
          borderBottom: '1px solid#ffffff14',
        }}
      >
        <Button
          sx={{
            color: 'white',
          }}
          onClick={() => navigate(`/nft/${nft.id}`, { replace: true })}
        >
          <MoreHorizIcon />
        </Button>
      </TableCell>
    </TableRow>
  );
}
