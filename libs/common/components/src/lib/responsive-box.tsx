import { throttle } from 'lodash';
import { Box } from '@mui/material';
import { useEffect, useMemo, useRef, useState } from 'react';

export function ResponsiveBox(props: {
  children: React.ReactNode;
  ratio?: '1/1' | '16/9';
}) {
  const { ratio } = props;
  const box = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState<number>();
  const width = useMemo(() => size ?? 100, [size]);
  const height = useMemo(() => {
    switch (ratio) {
      case '16/9':
        return (width * 9) / 16;
      default:
        return width;
    }
  }, [ratio, width]);

  const handleResize = throttle(() => {
    if (box && box.current) {
      const dims = box.current.getBoundingClientRect();
      if (dims) {
        setSize(dims.width);
      }
    }
  }, 300);

  const onResize = useMemo(() => handleResize, [handleResize]);

  useEffect(() => {
    window.addEventListener('resize', onResize);
    onResize();
    return () => window.removeEventListener('resize', onResize);
  }, [onResize]);

  return (
    <Box
      ref={box}
      overflow="hidden"
      width="100%"
      height={height}
      position="relative"
      sx={{ borderRadius: 1 }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
}

export default ResponsiveBox;
