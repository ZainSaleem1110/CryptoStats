import { useGetSearchResult } from '@webadmin/api';
import * as React from 'react';
import {
  Input,
  Box,
  IconButton,
  Typography,
  CircularProgress,
} from '@mui/material';
import { NftItemSearch } from './item/NftItem';
import { UserItemSearch } from './item/UserItem';
import { CollectionItemSearch } from './item/CollectionItem';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { useDebounce } from '@common/utils';

function useOutsideAlerter(ref: any, setFocus: any) {
  React.useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setFocus(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, setFocus]);
}

export function SearchBar() {
  const [inputValue, setInputValue] = React.useState<string | undefined>();
  const wrapperRef = React.useRef(null);
  const [focus, setFocus] = React.useState<boolean>(false);
  const debounceInputValue = useDebounce(inputValue, 350);
  const { data, refetch, status } = useGetSearchResult(inputValue);
  useOutsideAlerter(wrapperRef, setFocus);
  
  const handleFocus = () => setFocus(fc => !fc);

  const handleDelay = (data: string) => {
    setInputValue(data);
  };

  React.useEffect(() => {
    if (debounceInputValue && debounceInputValue.length > 2) {
      refetch();
    }
  }, [debounceInputValue, refetch]);

  return (
    <Box
      ref={wrapperRef}
      sx={{
        flexDirection: 'column',
        position: 'relative',
        marginRight: {
          md: '.5rem',
        },
      }}
    >
      <Input
        id="component-simple"
        multiline={false}
        onFocus={() => setFocus(true)}
        value={inputValue}
        onChange={(e) => handleDelay(e.target.value)}
        placeholder="Search items, collections, and users"
        startAdornment={
          <InputAdornment position="start">
            <IconButton aria-label="toggle password visibility" edge="start">
              {status === 'loading' ? (
                <CircularProgress color="success" />
              ) : (
                <SearchIcon
                  sx={{
                    color: 'white',
                  }}
                />
              )}
            </IconButton>
          </InputAdornment>
        }
        disableUnderline
        sx={{
          backgroundColor: '#0F172A',
          borderRadius: '32px',
          padding: '.75rem 1.25rem',
          color: 'white',
          borderBottom: 'none',
          width: {
            sm: '100%',
            md: 350,
          },
          fontSize: 15,
        }}
      />
      {focus && data ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            gap: '1rem',
            backgroundColor: '#1E293B',
            width: '100%',
            padding: '1rem .75rem',
            borderRadius: '10px',
            maxHeight: '300px',
            overflowY: 'scroll',
            overflowX: 'hidden',
            borderBottomLeftRadius: '10px',
            borderBottomRightRadius: '10px',
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
          }}
        >
          {data?.collections && data.collections.length > 0 && (
            <div>
              <Typography variant="subtitle1" color="white">
                Collection
              </Typography>

              {data.collections.map((item, index) => (
                <CollectionItemSearch
                  key={index}
                  name={item.name}
                  address={item.address}
                  handleFocus={handleFocus}
                  id={item.id}
                  item={true}
                />
              ))}
            </div>
          )}
          {data?.items && data.items.length > 0 && (
            <div>
              <Typography variant="subtitle1" color="white">
                NFTs
              </Typography>

              {data.items.map((item, index) => (
                <NftItemSearch
                  id={item.id}
                  key={index}
                  name={item.name}
                  handleFocus={handleFocus}
                  tokenId={item.tokenId}
                  image={item.image}
                  item={true}
                />
              ))}
            </div>
          )}
          {data?.users && data.users.length > 0 && (
            <div>
              <Typography variant="subtitle1" color="white">
                Utilisateurs
              </Typography>

              {data.users.map((item, index) => (
                <UserItemSearch
                  key={index}
                  username={item.username}
                  handleFocus={handleFocus}
                  address={item.address}
                  id={item.id}
                  item={true}
                />
              ))}
            </div>
          )}
        </Box>
      ) : null}
    </Box>
  );
}
