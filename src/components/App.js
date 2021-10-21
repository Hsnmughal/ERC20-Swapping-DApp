import React, { Component } from 'react';
import Web3 from 'web3';
// import logo from '../logo.png';
import './App.css';
import detectEthereumProvider from '@metamask/detect-provider';

const App = () => {


  const loadWeb3 = async () => {
    // This function detects most providers injected at window.ethereum

    const provider = await detectEthereumProvider();

    if (provider) {
      // From now on, this should always be true:
      // provider === window.ethereum
      startApp(provider); // initialize your app
    } else {
      console.log('Please install MetaMask!');
    }
  }

  return (
    <div>
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="http://www.dappuniversity.com/bootcamp"
          target="_blank"
          rel="noopener noreferrer"
        >
          Dapp University
        </a>
      </nav>
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
