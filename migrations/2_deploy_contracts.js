const EthSwap = artifacts.require("EthSwap");

const Token = artifacts.require("Token");

module.exports = async function(deployer){
    
    // deploying DAppToken
    await deployer.deploy(Token);
    const tk = await Token.deployed();

    // deploying EthSwap
    await deployer.deploy(EthSwap, tk.address);
    const contract_1 = await EthSwap.deployed();
    
    // Transfering million:
    await tk.transfer(contract_1.address, '1000000000000000000000000');
};

