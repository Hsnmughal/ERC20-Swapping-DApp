import React, { useState } from 'react'
import BuyForm from '../buyForm/buyForm';
import SellForm from '../sellForm/sellForm';

const Main = (props) => {
    // STATES
    const [toggler, setToggler] = useState(true);

    // DESTRUCTURING PORPS
    const { ethBalance, tokenBalance, buyTokens , sellTokens} = props;
    console.log(ethBalance + ' <> ' + tokenBalance);
    return (
        <div id="content" className="mt-3">

            <div className="d-flex justify-content-between mb-3">
                <button
                    className="btn btn-light"
                    onClick={() => setToggler(true)}
                >
                    Buy
                </button>
                <span className="text-muted">&lt; &nbsp; &gt;</span>
                <button
                    className="btn btn-light"
                    onClick={() => setToggler(false)}
                >
                    Sell
                </button>
            </div>

            <div className="card mb-4 " >

                <div className="card-body">

                    {toggler
                        ?
                        <BuyForm
                            ethBalance={ethBalance}
                            tokenBalance={tokenBalance}
                            buyTokens={buyTokens}
                        />
                        :
                        <SellForm
                            ethBalance={ethBalance}
                            tokenBalance={tokenBalance}
                            sellTokens={sellTokens}
                        />
                    }

                </div>

            </div>

        </div>
    )
}

export default Main
