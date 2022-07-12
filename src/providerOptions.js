import WalletConnect from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

export const providerOptions = {
  walletlink: {
    package: CoinbaseWalletSDK, // Required
    options: {
      appName: "Web 3 Modal Demo", // Required
      infuraId: "https://mainnet.infura.io/v3/0f159be7aada4d6894c662d7694672c6" // Required unless you provide a JSON RPC url; see `rpc` below
    }
  },
  walletconnect: {
    package: WalletConnect, // required
    options: {
      infuraId: "https://mainnet.infura.io/v3/0f159be7aada4d6894c662d7694672c6" // required
    }
  }
};
