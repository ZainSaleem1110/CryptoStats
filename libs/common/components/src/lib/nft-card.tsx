import { useCallback } from 'react';
import { Box, Card, CardContent, Skeleton, Typography } from '@mui/material';
import { Image, ResponsiveBox } from '@common/components';
import { Nft } from '@common/types';

export const NftCardSkeleton = () => {
  return (
    <Card sx={{ borderRadius: 4 }} elevation={0}>
      <CardContent>
        <Skeleton
          variant="rectangular"
          sx={{ width: '100%', height: '200px', borderRadius: 2 }}
        />
        <Skeleton width="100%">
          <Typography
            variant="body2"
            color="text.primary"
            noWrap={true}
            sx={{
              fontSize: 16,
              fontWeight: 'bold',
              marginTop: 2,
              width: '100%',
            }}
          >
            name
          </Typography>
        </Skeleton>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Skeleton width="3rem">
              <Typography
                variant="subtitle2"
                sx={{ fontSize: 14, marginLeft: 0.5 }}
              >
                0
              </Typography>
            </Skeleton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export const NftCard = (props: {
  data: Nft;
  onClick?: (value: Nft) => void;
}) => {
  const { onClick, data } = props;

  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick(data);
    }
  }, [onClick, data]);

  return (
    <Card
      sx={{ borderRadius: 4, cursor: onClick ? 'pointer' : 'default' }}
      elevation={0}
      onClick={handleClick}
    >
      <CardContent>
        <ResponsiveBox>
          <Image src={props.data.image} />
        </ResponsiveBox>
        <Typography
          variant="body2"
          color="text.primary"
          noWrap={true}
          sx={{ fontSize: 16, fontWeight: 'bold', marginTop: 2 }}
        >
          {props.data.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NftCard;
