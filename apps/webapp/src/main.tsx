import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AppTheme } from '@theme';
import { Provider } from 'react-redux';
import { store, persistor } from '@webapp/store';
import { PersistGate } from 'redux-persist/integration/react';
import { LayoutController } from '@webapp/layout';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { SnackBarProvider } from '@common/hooks';

import App from './app/app';
import Signin from './app/auth/signin';
import { MetaMaskProvider } from '@webapp/hooks';

const queryClient = new QueryClient({
  defaultOptions: { queries: { cacheTime: 2000, staleTime: 1000 * 60 * 30 } }, // 30 mins
  // defaultOptions: { queries: { cacheTime: 0 } },
});

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ThemeProvider theme={AppTheme}>
            <Web3ReactProvider getLibrary={getLibrary}>
              <BrowserRouter>
                <MetaMaskProvider>
                  <SnackBarProvider>
                    <LayoutController>
                      <Routes>
                        <Route path="/" element={<App />} />
                        <Route path="/auth/signin" element={<Signin />} />
                      </Routes>
                    </LayoutController>
                  </SnackBarProvider>
                </MetaMaskProvider>
              </BrowserRouter>
            </Web3ReactProvider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
