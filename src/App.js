import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import Token from './abis/Token.json';
import EthSwap from './abis/EthSwap.json';
import { Navbar } from './components';
// import logo from '../logo.png';
import './App.css';

const App = () => {

  // STATES
  let [account, setAccount] = useState('');
  let [accountBal, setAccountBal] = useState('');
  let [token, setToken] = useState({});


  // FUNCTIONS
  useEffect(() => {
    loadWeb3();
    loadBlockChainData();
    console.log(window.web3)
  }, [])

  const loadBlockChainData = async () => {
    // Getting WEB3
    const web3 = window.web3;

    // FETCHING ACCOUNT
    const accounts = await web3.eth.getAccounts();
    setAccount(account = accounts[0])

    // FETCHING BALANCE
    const EthSwapBal = await web3.eth.getBalance(account);
    setAccountBal(EthSwapBal);
    console.log(EthSwapBal);

    // FETCHING CONTRACT DATA
    const networkId = await web3.eth.net.getId();
    const tokenData = Token.networks[networkId];

    if (tokenData) {

      const tokenCreation = new web3.eth.Contract(Token.abi, tokenData.address);
      setToken(token = tokenCreation);
      console.log("Token var",tokenCreation)
      console.log("token state", token)
      console.log("token address", tokenData.address)
      
      let tokenBal = await tokenCreation.methods.balanceOf(account).call();
      console.log("TokenBal==> ", tokenBal.toString());
      
    } else {
      
      window.alert('Token contract not deployed to detected network.')

    }
  }

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  return (
    <div>
      <Navbar account={account}/>
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex text-center">
            <div className="content mr-auto ml-auto">
              <a
                href="http://www.dappuniversity.com/bootcamp"
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* <img src={logo} className="App-logo" alt="logo" /> */}
              </a>
              <h1>Dapp University Starter Kit</h1>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default App
