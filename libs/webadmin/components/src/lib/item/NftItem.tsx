import { Avatar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';

interface NftItemSearchProps {
  name: string;
  address?: string;
  image: string;
  id: string;
  tokenId: string;
  collectionName?: string;
  item?: boolean;
  handleFocus?: () => void;
}

export function NftItemSearch({
  image,
  id,
  name,
  tokenId,
  collectionName,
  handleFocus,
  item = false,
}: NftItemSearchProps) {
  const navigate = useNavigate();

  return (
    <Box
      onClick={() => {
        if (item) {
          if (handleFocus) {
            handleFocus();
          }
          navigate(`/nft/${id}`, { replace: true });
        }
      }}
      sx={{
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        cursor: item ? 'pointer' : 'cursor',
        paddingBottom: '15px',
        marginTop: '10px',
      }}
    >
      {image !== undefined ? (
        <Avatar
          src={image}
          alt={id}
          sx={{
            marginRight: '.5rem',
          }}
        />
      ) : null}
      <div
        style={{
          textAlign: 'start',
        }}
      >
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: '1.1rem',
          }}
        >
          {name}
        </Typography>
        <Typography
          sx={{
            fontSize: '.9rem',
            color: '#E2E8F0',
            height: 20,
            width: 100,
            overflow: 'hidden',
          }}
        >
          {collectionName} - {tokenId}
        </Typography>
      </div>
    </Box>
  );
}
