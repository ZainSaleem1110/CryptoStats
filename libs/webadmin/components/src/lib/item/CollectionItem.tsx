import { Avatar, Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DefaultAvatar from '@common/assets/images/defaultAvatar.svg';
import { useSnack } from '@common/hooks';
import { useNavigate } from 'react-router-dom';

interface CollectionItemSearch {
  name: string;
  address: string;
  profileImage?: string | null;
  id: string;
  item?: boolean;
  handleFocus?: () => void;
}

export function CollectionItemSearch({
  name,
  address,
  profileImage,
  id,
  handleFocus,
  item = false,
}: CollectionItemSearch) {
  const snack = useSnack();
  const navigate = useNavigate();

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    snack(`Copié !`, 'success');
  };

  return (
    <Box
      onClick={() => {
        if (item) {
          if (handleFocus) {
            handleFocus();
          }
          navigate(`/smartcontract/${id}`, { replace: true });
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
      <Avatar
        src={profileImage ? profileImage : DefaultAvatar}
        alt={id}
        sx={{
          marginRight: '.75rem',
          width: 40,
          height: 40,
        }}
      />
      <div>
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: '16px',
          }}
        >
          {name}
        </Typography>
        <Typography
          sx={{
            fontSize: '12px',
            color: '#E2E8F0',
            display: 'flex',
            alignItems: 'center',
            marginTop: '-.3rem',
          }}
        >
          {address.substring(0, 6)}..
          {address.substring(address.length - 3)}
          {!item ? (
            <Button
              sx={{
                color: 'white',
                marginLeft: '-1rem',
              }}
              onClick={() => copyAddress(address)}
            >
              <ContentCopyIcon
                fontSize="small"
                sx={{
                  width: '15px',
                }}
              />
            </Button>
          ) : null}
        </Typography>
      </div>
    </Box>
  );
}
