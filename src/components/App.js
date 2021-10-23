import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
// import logo from '../logo.png';
import './App.css';

const App = () => {

  const [account, setAccount] = useState('');
  const [accountBal, setAccountBal] = useState('');

  useEffect(() => {
    loadWeb3();
    loadBlockChainData();
    console.log(window.web3)
  }, [])

  const loadBlockChainData = async () => {
    // Getting WEB3
    const web3 = window.web3;

    // FETCHING ACCOUNT
    const account = await web3.eth.getAccounts();
    setAccount(account[0])
    console.log(account[0])

    // FETCHING BALANCE
    const accountBalance = await web3.eth.getBalance(account[0]);
    setAccountBal(accountBalance);
    console.log(accountBalance);

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
