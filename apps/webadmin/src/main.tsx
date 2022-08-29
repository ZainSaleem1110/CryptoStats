import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AppTheme } from '@theme';
import { Provider } from 'react-redux';
import { store, persistor } from '@webadmin/store';
import { PersistGate } from 'redux-persist/integration/react';
import { LayoutController } from '@webadmin/layout';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { SnackBarProvider } from '@common/hooks';

import App from './app/app';
import Nfts from './app/nfts';
import Signin from './app/auth/signin';
import Nftid from './app/nftID';
import AddSmartContracts from './app/addSmartContracts';
import Users from './app/users';
import UserId from './app/userID';
import SmartContractId from './app/smartContractId'

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
                <SnackBarProvider>
                  <LayoutController>
                    <Routes>
                        <Route 
                          path="/" 
                          element={<App />} 
                        />
                         <Route 
                          path="/smartcontract/:id" 
                          element={<SmartContractId />} 
                        />
                        <Route 
                          path="/Nfts" 
                          element={<Nfts />} 
                        />
                        <Route 
                          path="/Users" 
                          element={<Users />} 
                        />
                        <Route 
                          path="/user/:id" 
                          element={<UserId />} 
                        />
                        <Route 
                          path="/auth/signin" 
                          element={<Signin />} 
                        />
                        <Route 
                          path="/nft/:id" 
                          element={<Nftid />} 
                        />
                        <Route 
                          path="/addsmartcontracts" 
                          element={<AddSmartContracts/>} 
                        />
                      </Routes>
                    </LayoutController>
                  </SnackBarProvider>
              </BrowserRouter>
            </Web3ReactProvider>
          </ThemeProvider>
          </PersistGate>
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
