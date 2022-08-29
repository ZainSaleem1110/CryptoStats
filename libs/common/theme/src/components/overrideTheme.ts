import { ComponentsProps } from '@mui/material';

export const themeDefaultProps: ComponentsProps = {
  MuiAppBar: {
    elevation: 0,
  },
};

export const overrides = {
  MuiGrid: {
    container: {
      flexGrow: 1,
    },
  },
};
