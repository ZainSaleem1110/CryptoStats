import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Box } from '@mui/system';
import PlusIcon from '@common/assets/images/plusIcon.svg';
import { TableInfiniteQuery } from '@common/components';
import { SmartContract, SmartContractPage } from '@common/types';
import { SmartContractSkeleton, SmartContractCard } from '@webadmin/components';
import { UseGetSmartContracts } from '@webadmin/api';

export function App() {
  const query = UseGetSmartContracts();

  return (
    <Box
      sx={{
        paddingBottom: '17.5%',
        width:"100%"
      }}
    >
      <Grid sx={{display:"flex",alignItems:'center', justifyContent:"space-between", flexDirection:{
        md:"row",
        xs:"column"
      }}}>
        <Typography
          variant="h1"
          sx={{
            color: 'white'
          }}
        >
          Smart Contracts
        </Typography>
        <a
          href="/addsmartcontracts"
          style={{
            display: 'flex',
            alignItems: 'center',
            color: 'white',
            backgroundColor: '#47DDC2',
            borderRadius: '8px',
            textDecoration: 'none',
            padding: '.5rem 1.25rem',
          }}
        >
          <img
            src={PlusIcon}
            alt="Add icon"
            style={{
              marginRight: '.5rem'
            }}
          />
          Ajouter un Smart contract
        </a>
      </Grid>
      <TableContainer
        component={Paper}
        style={{
          backgroundColor: '#1E293B',
          marginTop: '2rem',
          borderRadius: '16px',
          padding: '1.5rem',
          paddingBottom: '1rem',
          width:'100%',
          overflowX:'auto'
        }}
      >
      <Table
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                color: '#93989A',
                border: 0
              }}
            >
              Nom
            </TableCell>
            <TableCell
              align="right"
              sx={{
                color: '#93989A',
                border: 0
              }}
            >
              Identifiant
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableInfiniteQuery<SmartContract, SmartContractPage>
            id={`SmartContract`}
            query={query}
            field="datas"
            renderItem={(smartContract) => <SmartContractCard smartContract={smartContract} key={smartContract.id} />}
            renderSkeleton={(id) => <SmartContractSkeleton key={id} />}
            md={12}
          />
        </TableBody>
      </Table>
      </TableContainer>
    </Box>
  );
}

export default App;
