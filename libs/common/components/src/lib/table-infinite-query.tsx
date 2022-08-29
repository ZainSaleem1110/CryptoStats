import { useMemo } from 'react';
import { UseInfiniteQueryResult } from 'react-query';
import Table from './table';
import { Box, Button, Grid } from '@mui/material';

export function TableInfiniteQuery<T, R>(props: {
  id: string;
  query: UseInfiniteQueryResult<R>;
  field: keyof R;
  renderItem: (value: T) => React.ReactNode;
  renderSkeleton?: (id: number) => React.ReactNode;
  xs?: number;
  md?: number;
  lg?: number;
}) {
  const { id, query, field } = props;
  const loading = useMemo(
    () => query.isLoading || query.isFetching || query.isIdle,
    [query]
  );

  const handleMore = useMemo(
    () => (query.hasNextPage ? query.fetchNextPage : undefined),
    [query]
  );

  return (
    <>
      <Table
        id={`${id}`}
        loading={loading}
        data={(query.data?.pages.map((page) => page[field]).flat() as T[]) || []}
        renderItem={props.renderItem}
        renderSkeleton={props.renderSkeleton}
        onMore={handleMore}
        xs={props.xs}
        md={props.md}
        lg={props.lg}
      />
      {!loading && handleMore ? (
        <Grid
          item
          xs={props.xs || 12}
          md={props.md || 6}
          lg={props.lg || 4}
        >
          <Box>
            <Button 
              onClick={() => handleMore()}
              sx={{
                backgroundColor:'white',
                color:'black',
                padding:'.6rem 2rem',
                position: 'absolute',
                left: '50%',
                marginTop: '20px',
                fontWeight: 'bold',
              }}
            > 
              Charger plus
            </Button>
          </Box>
        </Grid>
        ) : null}
    </>
  );
}

export default TableInfiniteQuery;
