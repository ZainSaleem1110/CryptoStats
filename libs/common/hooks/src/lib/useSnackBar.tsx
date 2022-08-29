import { Snackbar, Alert, Button } from '@mui/material';

import React, { createContext, useCallback, useContext } from 'react';

type SnackSeverityType = 'error' | 'warning' | 'info' | 'success';

interface button {
  buttonName: string,
  f: () => void;
}

type SnackBarContextActions = {
  setSnackBar: (text: string, severityType?: SnackSeverityType, button?: button) => void;
};

const SnackBarContext = createContext({} as SnackBarContextActions);

interface SnackBarContextProviderProps {
  children: React.ReactNode;
}

const SnackBarProvider: React.FC<SnackBarContextProviderProps> = ({
  children,
}) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>('');
  const [buttonFunction, setButtonFunction] = React.useState<(() => void) | undefined>(undefined);
  const [buttonName, setButtonName] = React.useState<string | undefined>(undefined);
  const [severityStyle, setSeverity] =
    React.useState<SnackSeverityType>('error');

  const setSnackBar = useCallback(
    (text: string, severityType?: SnackSeverityType, button?: button): void => {
      setMessage(text);
      setOpen(true);
      if (button) {
        setButtonName(button.buttonName)
        setButtonFunction(() => button.f);
      }
      setSeverity(severityType || 'success');
    },
    []
  );


  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <SnackBarContext.Provider value={{ setSnackBar }}>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={handleClose}
      >
        <Alert 
          onClose={handleClose} 
          severity={severityStyle}
          sx={{
            alignItems:'center'
          }}
        >
          {message}
          {buttonFunction !== undefined ? 
            <Button
              onClick={() => buttonFunction()}
            >
              {buttonName}
            </Button>
          : null}
        </Alert>
      </Snackbar>
      {children}
    </SnackBarContext.Provider>
  );
};

const useSnackBar = (): SnackBarContextActions => {
  const context = useContext(SnackBarContext);

  if (!context) {
    throw new Error('useSnackBar must be used within an SnackBarProvider');
  }

  return context;
};

export const useSnack = (): ((
  text: string,
  severityType?: SnackSeverityType,
  button?: button,
) => void) => {
  const context = useContext(SnackBarContext);

  if (!context) {
    throw new Error('useSnackBar must be used within an SnackBarProvider');
  }

  return context.setSnackBar;
};

export { SnackBarProvider, useSnackBar };
