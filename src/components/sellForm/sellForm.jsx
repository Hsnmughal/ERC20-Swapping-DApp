import React, { useState } from 'react';
import Web3 from 'web3';
import tokenLogo from '../../Assets/Images/tokenLogo.png';
import ethLogo from '../../Assets/Images/ethLogo.png';


const sellForm = (props) => {

    // STATES
    const [value, setValue] = useState('0');
    const [tokenAmount, setTokenAmount] = useState('0');

    // FUNCTIONS
    const formFunction = (e) => {
        e.preventDefault()
        props.sellTokens(tokenAmount);
    }
    return (
        <>
            <form className="mb-3" onSubmit={
                (e) => formFunction(e)
            }>
                <div>
                    <label className="float-left"><b>Input</b></label>
                    <span className="float-right text-muted">
                        Balance: {Web3.utils.fromWei(props.tokenBalance, 'Ether')}
                    </span>
                </div>
                <div className="input-group mb-4">
                    <input
                        type="text"
                        onChange={
                            (e) => {
                                if (e.target.value === '') {
                                    setValue('0' / 100);
                                }
                                else {
                                    setTokenAmount(Web3.utils.toWei(e.target.value, 'Ether'))
                                    setValue(e.target.value / 100);
                                }
                            }
                        }
                        className="form-control form-control-lg"
                        // placeholder="0"
                        required />
                    <div className="input-group-append">
                        <div className="input-group-text">
                            <img src={ethLogo} height='32' alt="" />
                            &nbsp;&nbsp;&nbsp; ETH
                        </div>
                    </div>
                </div>
                <div>
                    <label className="float-left"><b>Output</b></label>
                    <span className="float-right text-muted">
                        Balance: {Web3.utils.fromWei(props.ethBalance, 'Ether')}
                    </span>
                </div>
                <div className="input-group mb-2">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="0"
                        value={value}
                        disabled
                    />
                    <div className="input-group-append">
                        <div className="input-group-text">
                            <img src={tokenLogo} height='32' alt="" />
                            &nbsp; DApp
                        </div>
                    </div>
                </div>
                <div className="mb-5">
                    <span className="float-left text-muted">Exchange Rate</span>
                    <span className="float-right text-muted">1 ETH = 100 DApp</span>
                </div>
                <button type="submit" className="btn btn-primary btn-block btn-lg">SWAP!</button>
            </form>
        </>
    )
}

export default sellForm;
