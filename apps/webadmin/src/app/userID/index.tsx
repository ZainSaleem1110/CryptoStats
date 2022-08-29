import * as React from 'react';
import { Grid, Input, Typography, Button, Skeleton } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/system';
import leftArrow from '@common/assets/images/leftArrow.svg';
import { useNavigate } from 'react-router-dom';
import DefaultNft from '@common/assets/images/defaultNft.png';
import {
  useGetUserFromId,
  useUpdateUser,
  useRefreshUserFromId,
} from '@webadmin/api';
import { useDropzone } from 'react-dropzone';
import { useUploads } from '@webadmin/api';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import moment from 'moment';
import { useSnack } from '@common/hooks';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export const UserIdSkeleton = () => {
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
          User
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
              Username
            </Typography>
            <Skeleton height="100px" />
          </Box>
          <Box
            sx={{
              marginTop: '2rem',
            }}
          >
            <Typography variant="h4" color="white">
              User adress
            </Typography>
            <Skeleton height="100px" />
          </Box>
          <Box
            sx={{
              marginTop: '2rem',
            }}
          >
            <Typography variant="h4" color="white">
              Inscrit le
            </Typography>
            <Skeleton height="100px" />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default function UserId() {
  const { id } = useParams();
  const userId = id as string;
  const navigate = useNavigate();
  const [username, setUsername] = React.useState<string | undefined>(undefined);
  const { data: dataUser, status, refetch } = useGetUserFromId(userId);
  const [profileImage, setProfileImage] = React.useState<string>('');
  const snack = useSnack();
  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    snack(`Copié !`, 'success');
  };
  React.useEffect(() => {
    refetch();
  }, [userId, refetch]);

  const { mutate } = useUpdateUser(id);
  const { mutate: mutateRefresh } = useRefreshUserFromId();
  const { mutate: mutateUpload } = useUploads(id);

  const onDrop = React.useCallback(
    (acceptedFiles: any) => {
      const file = acceptedFiles?.[0];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        console.log(event.target.result);
        setProfileImage(event.target.result);
      };
      reader.readAsDataURL(file);
      // mutateUpload(acceptedFiles);
    },
    [mutateUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  if (status === 'loading') return <UserIdSkeleton />;
  return (
    <Box>
      <Grid
        container
        onClick={() => navigate('/users')}
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
          User
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
          <div
            {...getRootProps()}
            style={{
              position: 'relative',
            }}
          >
            <input {...getInputProps()} />
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <UploadFileIcon
                fontSize="large"
                sx={{
                  color: 'white',
                  backgroundColor: 'black',
                  borderRadius: '5px',
                  width: '50px',
                  padding: '.5rem',
                  height: '50px',
                  cursor: 'pointer',
                  zoom: isDragActive ? 1.15 : 1,
                }}
              />
            </div>
            <img
              src={profileImage || dataUser?.profileImage || DefaultNft}
              alt="pfp"
              style={{
                borderRadius: 20,
                width: '100%',
              }}
            />
          </div>
        </Grid>
        <Grid item xs={12} md={12} lg={7}>
          <Box
            sx={{
              marginTop: '2rem',
            }}
          >
            <Typography variant="h4" color="white">
              Username
            </Typography>
            <Input
              fullWidth
              defaultValue={dataUser?.username}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              Adresse wallet de l'utilisateur
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
              {dataUser?.address}
              <Button
                sx={{
                  color: 'white',
                  marginLeft: '-1rem',
                }}
                onClick={() => copyAddress(dataUser?.address || '')}
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
              Inscrit le
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
              {moment(dataUser?.createdAt).format('DD-MM-YYYY à HH:mm')}
            </Typography>
          </Box>
          {dataUser && (
            <Button
              variant="contained"
              onClick={() => mutateRefresh(dataUser.id)}
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
              Refresh
            </Button>
          )}
          {dataUser && (
            <Button
              variant="contained"
              onClick={() =>
                mutate({
                  username: username || undefined,
                  profileImage: profileImage || undefined,
                })
              }
              sx={{
                color: 'black',
                borderRadius: '12px',
                backgroundColor: 'white',
                fontWeight: 'bold',
                padding: '.5rem 2rem',
                fontSize: '1.1rem',
                marginTop: '2rem',
                marginLeft: '1rem',
              }}
            >
              Modifier
            </Button>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
