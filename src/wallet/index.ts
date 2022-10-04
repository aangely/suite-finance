import { BraveWallet, icon as braveWalletIcon } from "@web3-wallet/brave-wallet";
import { CryptocomDesktopWallet, icon as desktopWalletIcon } from "@web3-wallet/cryptocom-desktop-wallet";
import { DeFiWallet, icon as defiWalletIcon } from "@web3-wallet/defiwallet";
import { icon as metaMaskIcon, MetaMask } from "@web3-wallet/metamask";
import { WalletProxy } from "@web3-wallet/react";

import type { Provider } from "@web3-wallet/core";

export type WalletProvider = Provider & {
  isMetaMask: boolean;
  isBraveWallet: boolean;
  isDesktopWallet: boolean;
  isTrust: boolean;
};

/**
 * initialize wallet connectors
 */
const connectors = [
  new DeFiWallet(),
  new MetaMask({
    // p.isTrust is to enable using MetaMask to connect on DeFi Wallet
    // Brave wallet and MetaMas can't co-exist
    providerFilter: (p: any) => (p.isMetaMask || p.isTrust) && !p.isBraveWallet,
  }),
  new CryptocomDesktopWallet(),
  new BraveWallet(),
];

/**
 * Create a wallet proxy
 *
 * A wallet proxy is an interface for managing multiple wallets.
 */
export const walletProxy = new WalletProxy(connectors);
export const allWallets = walletProxy.getWallets();
export const [defiWallet, metamask, desktopWallet, braveWallet] = allWallets;
export const currentWallet = walletProxy.getCurrentWallet();
export const { useAccount, useIsConnected } = currentWallet;

export const walletMap = {
  [metamask.name]: metamask,
  [defiWallet.name]: defiWallet,
  [desktopWallet.name]: desktopWallet,
  [braveWallet.name]: braveWallet,
};

export const walletIconMap = {
  [metamask.name]: metaMaskIcon,
  [defiWallet.name]: defiWalletIcon,
  [desktopWallet.name]: desktopWalletIcon,
  [braveWallet.name]: braveWalletIcon,
};
