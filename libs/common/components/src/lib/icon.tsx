import { Box } from '@mui/material';

export const Icon = (props: {
  src: string;
  width?: number;
  height?: number;
  alt?: string;
  borderRadius?: number;
}) => {
  return (
    <Box
      component="span"
      sx={{
        width: `${props.width ?? 1}rem`,
        height: `${props.height ?? 1}rem`,
        display: 'flex',
        alignItems: 'center',
        borderRadius: props.borderRadius ?? 2,
        overflow: 'hidden',
      }}
    >
      <img src={props.src} alt={props.alt} />
    </Box>
  );
};

export default Icon;
