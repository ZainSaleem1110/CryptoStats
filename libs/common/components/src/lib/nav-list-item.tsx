import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Skeleton,
} from '@mui/material';

export const NavListItemSkeleton = () => {
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <Skeleton variant="circular" width="2.75rem" height="2.75rem" />
        <ListItemText primary={<Skeleton variant="text" />} />
      </ListItemButton>
    </ListItem>
  );
};

interface NavListItemProps {
  name: string;
  routeName: string;
  selected?: boolean;
  icon: any;
}

export function NavListItem({ 
  name, 
  routeName, 
  selected,
  icon
}: NavListItemProps) {
  const router = useRouter();
  const handleClick = useCallback(() => {
    if (routeName) {
      router.push(routeName)
    }
  }, [router, routeName]);

  const borderLeftColor = useMemo(
    () => (selected === true ? 'primary.main' : 'transparent'),
    [selected]
  );

  const backgroundColor = useMemo(
    () => (selected === true ? 'selectedBackgroundColor' : 'transparent'),
    [selected]
  );

  return (
    <ListItem
      disablePadding
      onClick={handleClick}
      sx={{
        borderLeftWidth: '5px',
        borderLeftColor,
        backgroundColor,
      }}
    >
      <ListItemButton>
        <ListItemAvatar>
          <Avatar alt={name} src={icon} />
        </ListItemAvatar>
        <ListItemText primary={name} />
      </ListItemButton>
    </ListItem>
  );
}
