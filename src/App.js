import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import Token from './abis/Token.json';
import EthSwap from './abis/EthSwap.json';
import { Navbar, Main } from './components';
// import logo from '../logo.png';
import './App.css';

const App = () => {

  // STATES
  let [account, setAccount] = useState('');
  let [ethBalance, setEthBalance] = useState('0');
  let [tokenBalance, setTokenBalance] = useState('0');
  let [token, setToken] = useState({});
  let [ethSwap, setEthSwap] = useState({});
  let [loading, setLoading] = useState(true);


  // FUNCTIONS
  useEffect(() => {
    loadWeb3();
    loadBlockChainData();
    console.log(window.web3)
  }, [])

  const loadBlockChainData = async () => {
    // Getting WEB3
    const web3 = window.web3;

    // FETCHING USER ACCOUNT
    const accounts = await web3.eth.getAccounts();
    setAccount(account = accounts[0])

    // TOKEN
    // FETCHING USER ETH BALANCE
    const ethBal = await web3.eth.getBalance(account);
    setEthBalance(ethBal);

    // FETCHING CONTRACT DATA
    const networkId = await web3.eth.net.getId();
    const tokenData = Token.networks[networkId];

    if (tokenData) {

      const tokenCreation = new web3.eth.Contract(Token.abi, tokenData.address);
      setEthSwap(token = tokenCreation);
      console.log("token state", token)

      let tokenBal = await token.methods.balanceOf(account).call();
      console.log("TokenBal==> ", tokenBal.toString());

    } else {

      window.alert('Token contract not deployed to detected network.')

    }

    // ETHSWAP
    // FETCHING CONTRACT DATA
    const EthSwapData = EthSwap.networks[networkId];

    if (EthSwapData) {

      const ethSwapCreation = new web3.eth.Contract(EthSwap.abi, EthSwapData.address);
      setEthSwap(ethSwap = ethSwapCreation);
      console.log("token state", ethSwap)

      let tokenBal = await token.methods.balanceOf(account).call();
      setTokenBalance(tokenBalance = tokenBal)

    } else {

      window.alert('Token contract not deployed to detected network.')

    }
    setLoading(false)
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

  const buyTokens = (ethAmount) => {
    setLoading(true)
    console.log(ethAmount)
    ethSwap.methods.buyTokens().send({from : account, value : ethAmount}).on('transactionHash', (Hash) => {
      setLoading(false)
    })
  }


  return (
    <div>
      <Navbar account={account} />
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex text-center">
            <div className="content mr-auto ml-auto">
              <a
                href="http://www.dappuniversity.com/bootcamp"
                target="_blank"
                rel="noopener noreferrer"
              >
              </a>
              {/* <h1>Dapp University Starter Kit</h1> */}
              {loading
                ?
                <p id="loader" className="text-center">Loading...</p>
                :
                <Main
                  ethBalance={ethBalance}
                  tokenBalance={tokenBalance}
                  buyTokens={buyTokens}
                // sellTokens={this.sellTokens}
                />
              }
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default App
