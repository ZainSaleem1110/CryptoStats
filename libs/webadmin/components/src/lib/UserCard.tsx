import { Button , Skeleton, TableCell, TableRow } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { UserInfo } from '@common/types';
import moment from 'moment';
import { useNavigate } from "react-router";
import { UserItemSearch } from "./item/UserItem";

export const UserCardSkeleton = () => {
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
          border: 0
        }}
      >
        <Skeleton />  
      </TableCell>
  </TableRow>
  );
};

interface UserProps {
  user: UserInfo;
}
export function UserCard({
  user
}: UserProps) {
  const navigate = useNavigate();

  return (
    <TableRow
      key={user.id}
    >
      <TableCell 
        component="th" 
        scope="row"
        sx={{
          borderBottom: '1px solid#ffffff14'
        }}
      >
        <UserItemSearch 
          username={user.username}
          address={user.address}
          id={user.id}
          profileImage={user.profileImage}
        />
        
      </TableCell>
      <TableCell
        align="right"
        sx={{
          color:'white',
          borderBottom: '1px solid#ffffff14'
        }}
      >
        {moment(user.createdAt).format('DD/MM/YYYY')}
      </TableCell>
      <TableCell 
        align="right"
        sx={{
          borderBottom: '1px solid#ffffff14'
        }}
      >
        <Button
          sx={{
            color:'white'
          }}
          onClick={() => navigate(`/user/${user.id}`, {replace: true})}
        >
          <MoreHorizIcon />
        </Button>
      </TableCell>
    </TableRow>
  )
}