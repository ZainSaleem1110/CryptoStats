import {
  createTheme,
  responsiveFontSizes,
  ThemeOptions as DefaultThemeOptions,
} from '@mui/material/styles';
import {} from '@mui/material/TextField';

declare module '@mui/material/TextField' {
  interface TextFieldPropsVariantOverrides {
    bootstrap: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    more: true;
    gradient: true;
    connect: true;
    message: true;
    translucid: true;
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    gradient: {
      from: string;
      to: string;
    };
    chatBoxUser: string;
    selectedBackgroundColor: string;
  }

  interface PaletteOptions {
    gradient: {
      from: string;
      to: string;
    };
    chatBoxUser: string;
    selectedBackgroundColor: string;
  }
}

let theme = createTheme();


theme = createTheme(theme, {
  typography: {
    fontSize: 14,
    fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',].join(','),

    h1: {
      fontWeight: 700,
      fontSize: '2.5rem', // about 42px
      color: 'white',
    },
    h2: {
      fontWeight: 700,
      fontSize: '1.8rem', // about 30px
      color: 'white',
    },
    h3: {
      fontWeight: 700,
      fontSize: '1.5rem', // about 24px
      color: 'white',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.125rem', // about 20px
      color: 'white',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1rem', // about 16px
      color: 'white',
    },
    h6: {
      fontWeight: 600,
      fontSize: '0.88rem', // about 14px
      color: 'white',
    },
    body1: {
      fontSize: '0.88rem',
      fontWeight: 400,
      color: 'white',
    },
    body2: {
      fontSize: '1rem',
      fontWeight: 400,
      color: 'white',
    },
  },
  components: {
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderRadius: '0.5rem',
        },
      },
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          marginLeft: '1rem',
          marginRight: '1rem',
          borderRadius: '0.5rem',
          width: 'calc(100% - 2 * 1rem)',
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: '0.5rem 1rem',
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderRadius: '0.5rem',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          width: '100%',
          fontSize: '1rem',
          backgroundColor: '#F7F9FA',
        },
        input: {
          padding: '0rem',
        },
        hiddenLabel: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 100,
        },
      },
      variants: [
        {
          props: { variant: 'connect' },
          style: {
            border: `1px solid #cfdbd5`,
            borderRadius: 100,
            width: '100%',
            color: '#0F172A',
            textTransform: 'none',
            '& .MuiTypography-root': {
              fontSize: '0.88rem',
              marginLeft: '0.75rem',
            },
          },
        },
        {
          props: { variant: 'message' },
          style: {
            border: `1px solid #cfdbd5`,
            borderRadius: 100,
            width: '100%',
            color: '#777E90',
            backgroundColor: '#E6E8EC',
            textTransform: 'none',
            '& .MuiTypography-root': {
              fontSize: '0.88rem',
              marginLeft: '0.75rem',
            },
          },
        },
        {
          props: { variant: 'more', color: 'primary' },
          style: {
            border: `1px solid #cfdbd5`,
            borderRadius: 100,
            textTransform: 'none',
            color: 'white',
            backgroundColor: theme.palette.primary.main,
            '& .MuiTypography-root': {
              fontSize: '0.88rem',
              marginLeft: '0.75rem',
            },
          },
        },
        {
          props: { variant: 'gradient' },
          style: {
            border: `1px solid #cfdbd5`,
            color: 'white',
            background: 'linear-gradient(to right top, #4C6FFF,  #BB65FF)',
            textTransform: 'none',
            '& .MuiTypography-root': {
              color: 'white',
              marginLeft: '0.75rem',
            },
          },
        },
        {
          props: { variant: 'translucid' },
          style: {
            border: `1px solid #cfdbd5`,
            color: theme.palette.primary.main,
            fontSize: '0.88rem',
            backgroundColor: theme.palette.selectedBackgroundColor,
            textTransform: 'none',
            '& .MuiTypography-root': {
              color: theme.palette.primary.main,
              marginLeft: '0.75rem',
            },
          },
        },
      ],
    },

    MuiTabs: {
      defaultProps: {
        TabIndicatorProps: {
          hidden: true,
        },
      },
    },
    MuiTab: {
      defaultProps: {},
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 300,
          minHeight: '1rem',
          fontSize: '1rem',
          borderRadius: 100,
          '&.Mui-selected': {
            backgroundColor: theme.palette.primary.main,
            color: 'white',
          },
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
