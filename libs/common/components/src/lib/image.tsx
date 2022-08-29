import { Skeleton } from '@mui/material';
import { useState } from 'react';

export function Image(props: { src: string; alt?: string, radius?: number }) {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading'
  );
  return (
    <>
      <img
        src={props.src}
        width="100%"
        height="100%"
        alt={props.alt}
        style={{
          objectFit: 'cover',
          visibility: status === 'success' ? 'visible' : 'hidden',
          opacity: status === 'success' ? 1 : 0,
          transition: 'all 1s ease',
          backgroundColor: 'transparent',
          borderRadius: props.radius ? props.radius : 0,
        }}
        onLoad={() => setStatus('success')}
        onError={() => setStatus('error')}
      />
      {status === 'loading' ? (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{ position: 'absolute', top: 0 }}
        />
      ) : null}
    </>
  );
}

export default Image;
