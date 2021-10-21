pragma solidity^0.5.0;

import './Token.sol';

contract EthSwap {
    string public name = "ERC20 Instant Swapping...";
    uint public rate = 100;
    Token public token;

    constructor(Token _token) public {
        token = _token;
    }

    event TokensPurchased(
        address account,
        address token,
        uint amount,
        uint rate
    );

    event TokensBought(
        address account,
        address token,
        uint amount,
        uint rate
    );

    function buyTokens() public payable {
        uint ethToTokens = msg.value * rate;

        require(token.balanceOf(address(this)) >= ethToTokens);

        token.transfer(msg.sender, ethToTokens);

        emit TokensPurchased(msg.sender, address(token), ethToTokens, rate); 
    }

    function sellTokens(uint _amount) public {
        uint tokensToEth = _amount / rate;

        require(token.balanceOf(msg.sender) >= _amount);
        
        require(address(this).balance >= tokensToEth);

        token.transferFrom(msg.sender, address(this), _amount);

        msg.sender.transfer(tokensToEth);

        emit TokensBought(msg.sender, address(token), _amount, rate);
    }

}
