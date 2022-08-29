import * as React from 'react';
import { TableInfiniteQuery } from '@common/components';
import { UserPage, UserInfo } from '@common/types';
import {
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Typography,
  Box,
} from '@mui/material';
import { UseGetUserList } from '@webadmin/api';
import { UserCard, UserCardSkeleton } from '@webadmin/components';
import moment from 'moment';
import CloseIcon from '@mui/icons-material/Close';


type selectedType = undefined | 'week' | 'month' | 'other';

export default function Users() {
  const [periodStart, setPeriodeStart] = React.useState<undefined | string>(
    undefined
  );
  const [periodeEnd, setPeriodeEnd] = React.useState<undefined | string>(
    undefined
  );
  const [selected, setSelected] = React.useState<selectedType>(undefined);
  const [open, setOpen] = React.useState<boolean>(false);

  const query = UseGetUserList(periodStart, periodeEnd);

  const handleWeek = () => {
    setPeriodeStart(moment().startOf('week').format('YYYY-MM-DD'));
    setSelected('week');
  };

  const handleMonth = () => {
    setPeriodeStart(moment().startOf('month').format('YYYY-MM-DD'));
    setSelected('month');
  };

  const handleOthers = (date: Date) => {
    setPeriodeStart(date.toString());
    setSelected('other');
  };

  const [value, setValue] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54')
  );

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    query.refetch();
  }, [periodStart]);

  return (
    <Box
      sx={{
        paddingBottom: '17.5%',
      }}
    >
      <Grid container alignItems="center" gap={2}>
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: '1.2rem',
          }}
        >
          Filtrer par
        </Typography>
        <Button
          variant="contained"
          onClick={() => handleWeek()}
          sx={{
            border: '2px solid white',
            backgroundColor: selected === 'week' ? 'white' : 'transparent',
            color: selected === 'week' ? 'black' : 'white',
          }}
        >
          Cette semaine
        </Button>
        <Button
          variant="contained"
          onClick={() => handleMonth()}
          sx={{
            border: '2px solid white',
            backgroundColor: selected === 'month' ? 'white' : 'transparent',
            color: selected === 'month' ? 'black' : 'white',
          }}
        >
          Ce mois-ci
        </Button>
        {selected && (
          <Button
            variant="contained"
            onClick={() => {
              setPeriodeStart(undefined);
              setSelected(undefined);
            }}
            sx={{
              border: '2px solid white',
              backgroundColor: selected === 'week' ? 'white' : 'transparent',
              color: selected === 'week' ? 'black' : 'white',
            }}
          >
            <CloseIcon />
          </Button>
        )}
        {/* <Grid item>
          <DatePicker 
            onChange={(date: Date) => handleOthers(date)} 
            customInput={
            <CustomDatePicker 
              ref={ref}
              selected={selected} 
            />
            }
          />
        </Grid> */}
      </Grid>
      <TableContainer
        component={Paper}
        style={{
          backgroundColor: '#1E293B',
          borderRadius: '16px',
          padding: '1.5rem',
          marginTop: '2rem',
        }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  color: '#93989A',
                  border: 0,
                }}
              >
                Nom
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  color: '#93989A',
                  border: 0,
                }}
              >
                Date inscription
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableInfiniteQuery<UserInfo, UserPage>
              id={`UserInfo`}
              query={query}
              field="datas"
              renderItem={(user) => <UserCard user={user} key={user.id} />}
              renderSkeleton={(id) => <UserCardSkeleton key={id} />}
              md={12}
            />
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
