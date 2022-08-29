import { Button, Skeleton, TableCell, TableRow } from "@mui/material";
import { SmartContract } from '@common/types';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useNavigate } from "react-router-dom";
import { CollectionItemSearch } from './item/CollectionItem'

export const SmartContractSkeleton = () => {
  return (
    <TableRow>
      <TableCell 
        sx={{
          border: 0
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

interface SmartContractCard {
  smartContract: SmartContract;
}
export function SmartContractCard({
  smartContract
}: SmartContractCard) {
  const navigate = useNavigate();

  return (
    <TableRow
      key={smartContract.id}
    >
      <TableCell
        component="th" 
        scope="row"
        sx={{
          borderBottom: '1px solid#ffffff14'
        }}
      >
        <CollectionItemSearch
          key={smartContract.id}
          address={smartContract.address}
          name={smartContract.name}
          id={smartContract.id}
          profileImage={smartContract.profileImage}
        />
      </TableCell>
      <TableCell
        align="right"
        sx={{
          color:'white',
          borderBottom: '1px solid#ffffff14',
        }}
      >
        {smartContract.symbol}
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
          onClick={() => navigate(`/smartcontract/${smartContract.id}`, {replace: true})}
        >
          <MoreHorizIcon />
        </Button>
      </TableCell>
    </TableRow>
  )
}