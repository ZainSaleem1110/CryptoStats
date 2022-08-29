import DefaultAvatar from '@common/assets/images/defaultAvatar.svg';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Avatar, Box, Button } from '@mui/material';
import { useSnack } from '@common/hooks';
import { useNavigate } from 'react-router';

interface UserItemItemSearchProps {
  username: string | null;
  address: string;
  id: string;
  profileImage?: string | null;
  item?: boolean;
  handleFocus?: () => void;
}

export function UserItemSearch({
  username,
  address,
  id,
  profileImage,
  handleFocus,
  item = false,
}: UserItemItemSearchProps) {
  const snack = useSnack();
  const navigate = useNavigate();

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    snack(`Copié`, 'success');
  };

  return (
    <Box
      onClick={() => {
        if (item) {
          if (handleFocus) {
            handleFocus();
          }
          navigate(`/user/${id}`, { replace: true });
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
          marginRight: '.5rem',
          border: 'none',
        }}
      />
      {username ? username : address}
      {!username && !item && (
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
      )}
    </Box>
  );
}
