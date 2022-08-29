import * as React from 'react';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { useSnack } from '@common/hooks';

interface IMetaMaskContext {
  account?: string | null;
  connect: (wallet: InjectedConnector) => Promise<void>;
  disconnect: () => Promise<void>;
  nameProvider: string;
  isActive: boolean;
}

export const MetaMaskContext = React.createContext<IMetaMaskContext | null>(
  null
);

export const MetaMaskProvider = (props: { children: React.ReactNode }) => {
  const { activate, account, library, deactivate, active } = useWeb3React();
  const toast = useSnack();
  const [isActive, setIsActive] = React.useState<boolean>(false);

  // Connect to wallet
  const connect = async (wallet: InjectedConnector) => {
    try {
      await activate(wallet);
    } catch (error: any) {
      toast(error, 'error');
    }
  };

  const handleIsActive = React.useCallback(() => {
    setIsActive(active);
  }, [active]);

  React.useEffect(() => {
    handleIsActive();
  }, [handleIsActive]);

  // Disconnect from wallet
  const disconnect = async () => {
    try {
      await deactivate();
    } catch (error: any) {
      toast(error, 'error');
    }
  };

  const nameProvider = React.useMemo(() => {
    switch (library?.connection?.url) {
      case 'metamask':
        return 'MetaMask';
      default:
        return 'Unknown provider';
    }
  }, [library]);

  return (
    <MetaMaskContext.Provider
      value={{
        account,
        connect,
        disconnect,
        nameProvider,
        isActive,
      }}
    >
      {props.children}
    </MetaMaskContext.Provider>
  );
};

export const useMetaMask = () =>
  React.useContext(MetaMaskContext) as IMetaMaskContext;
